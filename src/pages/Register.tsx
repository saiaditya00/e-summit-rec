import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { IndianRupee } from 'lucide-react';

// interface Profile {
//   full_name: string;
//   email: string;
// }


export default function Register() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  // const [profile, setProfile] = useState<Profile>({ full_name: '', email: '' });
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [formData, setFormData] = useState({
    phone: '',
    full_name: '',
    email: '',
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

    async function loadProfile() {
      try {
        // // Get profile data
        // const { data: profileData, error: profileError } = await supabase
        //   .from('profiles')
        //   .select('full_name')
        //   .eq('id', user?.id)
        //   .maybeSingle();

        // if (profileError) {
        //   // If profile doesn't exist, create it
        //   if (profileError.code === 'PGRST116') {
        //     const { error: insertError } = await supabase
        //       .from('profiles')
        //       .insert([{ id: user?.id, full_name: '', avatar_url: '', bio: '' }])
        //       .select()
        //       .single();

        //     if (insertError) throw insertError;
        //   } else {
        //     throw profileError;
        //   }
        // }

        // if (profileData) {
        //   setProfile({ full_name: profileData.full_name, email: user?.email || '' });
        // }

        // Get QR code on initial load
        const qrCode = await getAvailableQRCode();
        setQrCode(qrCode.qr_url);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load profile information. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user, navigate]);

  const getAvailableQRCode = async () => {
    try {
      // Get QR code with available count
      const { data: qrCodes, error: qrError } = await supabase
        .from('qr_codes')
        .select('*')
        .gt('count', 0)
        .order('id')
        .limit(1);

      if (qrError) throw qrError;

      if (!qrCodes || qrCodes.length === 0) {
        // If no QR codes available, reset counts
        await supabase.rpc('reset_qr_codes');
        
        // Try getting QR code again
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
    setSubmitting(true);

    if (!formData.terms_accepted) {
      setError('You must accept the terms and conditions to register');
      setSubmitting(false);
      return;
    }

    if (!transactionId.trim()) {
      setError('Please enter the transaction ID from your payment');
      setSubmitting(false);
      return;
    }

    try {
      // Get current QR code
      const { data: currentQrCode, error: qrError } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('qr_url', qrCode)
        .single();

      if (qrError) throw qrError;

      // Decrease QR code count
      const { error: updateError } = await supabase
        .from('qr_codes')
        .update({ count: currentQrCode.count - 1 })
        .eq('id', currentQrCode.id);

      if (updateError) throw updateError;

      // Save registration with transaction ID
      const { error: registrationError } = await supabase
        .from('registrations')
        .insert([{
          user_id: user?.id,
          qr_code_id: currentQrCode.id,
          transaction_id: transactionId,
          ...formData
        }]);

      if (registrationError) throw registrationError;

      // Navigate home after successful registration
      navigate('/filled');
    } catch (error) {
      console.error('Error submitting registration:', error);
      setError('Failed to submit registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

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
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">College/Institution</label>
                    <input
                      type="text"
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Profession</label>
                    <select
                      required
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Profession</option>
                      <option value="student">Student</option>
                      <option value="professional">Professional</option>
                      <option value="entrepreneur">Entrepreneur</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">T-shirt Size</label>
                    <select
                      required
                      value={formData.tshirt_size}
                      onChange={(e) => setFormData({ ...formData, tshirt_size: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location/Area</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                    <input
                      type="text"
                      required
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="Enter UPI transaction ID"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={formData.terms_accepted}
                      onChange={(e) => setFormData({ ...formData, terms_accepted: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
                    Please scan the QR code below to complete your payment of ₹499. After payment, enter the transaction ID in the form.
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