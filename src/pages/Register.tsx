import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { IndianRupee } from 'lucide-react';

interface FormErrors {
  full_name?: string;
  email?: string;
  phone?: string;
  institution?: string;
  profession?: string;
  tshirt_size?: string;
  location?: string;
  transaction_id?: string;
}

export default function Register() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    full_name: '',
    institution: '',
    profession: '',
    tshirt_size: '',
    location: '',
    terms_accepted: false
  });

  useEffect(() => {
    if (!user) {
      navigate('/?register=true');
      return;
    }

    async function checkExistingRegistration() {
      try {
        const { data: existingRegistration, error: registrationError } = await supabase
          .from('registrations')
          .select('id')
          .eq('user_id', user?.id)
          .single();

        if (registrationError && registrationError.code !== 'PGRST116') {
          throw registrationError;
        }

        if (existingRegistration) {
          navigate('/filled');
          return;
        }

        const qrCode = await getAvailableQRCode();
        setQrCode(qrCode.qr_url);
      } catch (error) {
        console.error('Error checking registration:', error);
        setError('Failed to load registration data. Please try refreshing the page.');
      }
    }

    checkExistingRegistration();
  }, [user, navigate]);


  // validiating the form
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    // Full Name validation
    if (formData.full_name.trim().length < 2) {
      errors.full_name = 'Full name must be at least 2 characters long';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    // Institution validation
    if (formData.institution.trim().length < 2) {
      errors.institution = 'Institution name must be at least 2 characters long';
      isValid = false;
    }

    // Profession validation
    if (!formData.profession) {
      errors.profession = 'Please select your profession';
      isValid = false;
    }

    // T-shirt size validation
    if (!formData.tshirt_size) {
      errors.tshirt_size = 'Please select your T-shirt size';
      isValid = false;
    }

    // Location validation
    if (formData.location.trim().length < 2) {
      errors.location = 'Location must be at least 2 characters long';
      isValid = false;
    }

    // Transaction ID validation
    const transactionIdRegex = /^[0-9A-Za-z]{12,}$/;
    if (!transactionId.trim()) {
      errors.transaction_id = 'Transaction ID is required';
      isValid = false;
    } else if (!transactionIdRegex.test(transactionId.trim())) {
      errors.transaction_id = 'Please enter a valid transaction ID with at least 12 characters';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const getAvailableQRCode = async () => {
    try {
      const { data: qrCodes, error: qrError } = await supabase
        .from('qr_codes')
        .select('*')
        .gt('count', 0)
        .order('id')
        .limit(1);

      if (qrError) throw qrError;

      if (!qrCodes || qrCodes.length === 0) {
        await supabase.rpc('reset_qr_codes');
        
        const { data: resetQrCodes, error: resetError } = await supabase
          .from('qr_codes')
          .select('*')
          .gt('count', 0)
          .order('id')
          .limit(1);

        if (resetError) throw resetError;
        if (!resetQrCodes || resetQrCodes.length === 0) {
          throw new Error('No QR codes available');
        }

        return resetQrCodes[0];
      }

      return qrCodes[0];
    } catch (error) {
      console.error('Error getting QR code:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFormErrors({});

    if (!validateForm()) {
      return;
    }

    if (!formData.terms_accepted) {
      setError('You must accept the terms and conditions to register');
      return;
    }

    setSubmitting(true);

    try {
      // Check again for existing registration before submitting
      const { data: existingRegistration, error: registrationCheckError } = await supabase
        .from('registrations')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (registrationCheckError && registrationCheckError.code !== 'PGRST116') {
        throw registrationCheckError;
      }

      if (existingRegistration) {
        navigate('/filled');
        return;
      }

      const { data: currentQrCode, error: qrError } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('qr_url', qrCode)
        .single();

      if (qrError) throw qrError;

      const { error: updateError } = await supabase
        .from('qr_codes')
        .update({ count: currentQrCode.count - 1 })
        .eq('id', currentQrCode.id);

      if (updateError) throw updateError;

      const { error: registrationError } = await supabase
        .from('registrations')
        .insert([{
          user_id: user?.id,
          qr_code_id: currentQrCode.id,
          transaction_id: transactionId.trim(),
          ...formData
        }]);

      if (registrationError) throw registrationError;

      navigate('/filled');
    } catch (error) {
      console.error('Error submitting registration:', error);
      setError('Failed to submit registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Registration Form */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Register for E-Summit'25</h2>
            </div>

            <div className="p-6">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        formErrors.full_name ? 'border-red-300' : 'border-gray-600'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {formErrors.full_name && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.full_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        formErrors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        formErrors.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your 10-digit phone number"
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">College/Institution</label>
                    <input
                      type="text"
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        formErrors.institution ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your college/institution name"
                    />
                    {formErrors.institution && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.institution}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Profession</label>
                    <select
                      required
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        formErrors.profession ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Profession</option>
                      <option value="student">Student</option>
                      <option value="professional">Professional</option>
                      <option value="entrepreneur">Entrepreneur</option>
                      <option value="other">Other</option>
                    </select>
                    {formErrors.profession && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.profession}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">T-shirt Size</label>
                    <select
                      required
                      value={formData.tshirt_size}
                      onChange={(e) => setFormData({ ...formData, tshirt_size: e.target.value })}
                      className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        formErrors.tshirt_size ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                    {formErrors.tshirt_size && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.tshirt_size}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location/Area</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        formErrors.location ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your location"
                    />
                    {formErrors.location && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.location}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                    <input
                      type="text"
                      required
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="Enter payment UPI transaction ID"
                      className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        formErrors.transaction_id ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.transaction_id && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.transaction_id}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={formData.terms_accepted}
                      onChange={(e) => setFormData({ ...formData, terms_accepted: e.target.checked })}
                      className="h-4 w-4 p-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3">
                    <label className="text-sm text-gray-700">
                      I agree to the terms and conditions of E-Summit'25 and confirm that the information provided is accurate.
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Complete Registration'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* QR Code Section */}
          {qrCode && (
            <div className="bg-white shadow rounded-lg p-8">
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <IndianRupee className="h-8 w-8 text-blue-600 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">Payment Required</h2>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                  <p className="text-blue-800">
                    Please scan the QR code below to complete your payment of ₹599. <span><b>After payment, enter the transaction ID in the form.</b></span>
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-100 rounded-xl p-6 mb-6 shadow-sm">
                  <img 
                    src={qrCode} 
                    alt="Payment QR Code" 
                    className="mx-auto max-w-[250px] rounded-lg"
                  />
                  <p className="mt-4 text-sm text-gray-500 text-center">
                    Scan with any UPI payment app
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}