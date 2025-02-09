import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function RegistrationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Registration Processing!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for registering for E-Summit'25. We look forward to seeing you at the event!
            Note: payment is under verification, You will receive an email with further instructions.
          </p>
        </div>
        <div>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}