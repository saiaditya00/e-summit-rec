import React, { useState } from 'react';
import { Routes, Route, useNavigate, /*useSearchParams*/ } from 'react-router-dom';
import { Menu, X, UserCircle, Rocket } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import Profile from './pages/Profile';
import Register from './pages/Register';
import RegistrationSuccess from './pages/RegistrationSuccess';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState('');
  const { user, signInWithGoogle, signOut } = useAuth();
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const showRegisterPrompt = searchParams.get('register') === 'true';

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleRegisterClick = () => {
    if (!user) {
      navigate('/?register=true');
      handleGoogleSignIn();
    } else {
      navigate('/register');
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-md">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                  {/* Logo */}
                  <div 
                    onClick={() => navigate('/')} 
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Rocket className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">E-Summit</span>
                  </div>

                  {/* Desktop Navigation */}
                  <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                      <>
                        <button
                          onClick={() => navigate('/profile')}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <UserCircle className="h-6 w-6" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleGoogleSignIn}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-2"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        <span>Sign in with Google</span>
                      </button>
                    )}
                  </div>

                  {/* Mobile menu button */}
                  <div className="md:hidden">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              {isMenuOpen && (
                <div className="md:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {user ? (
                      <>
                        <button
                          onClick={() => navigate('/profile')}
                          className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        >
                          Profile
                        </button>
                        <button
                          onClick={signOut}
                          className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleGoogleSignIn}
                        className="flex items-center space-x-2 w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        <span>Sign in with Google</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </nav>

            {/* Hero Section */}
            <div className="relative">
              <div className="absolute inset-0">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80"
                  alt="E-Summit background"
                />
                <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
              </div>
              <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  E-Summit 2025
                </h1>
                <p className="mt-6 text-xl text-gray-300 max-w-3xl">
                  Join the biggest entrepreneurship summit of the year. Connect with industry leaders,
                  innovative startups, and fellow entrepreneurs in this transformative event.
                </p>
                <div className="mt-10">
                  <button
                    onClick={handleRegisterClick}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <div className="p-6 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Keynote Speakers</h3>
                    <p className="text-gray-600">
                      Learn from industry leaders and successful entrepreneurs.
                    </p>
                  </div>
                  <div className="p-6 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Networking</h3>
                    <p className="text-gray-600">Connect with peers and potential investors.</p>
                  </div>
                  <div className="p-6 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Workshops</h3>
                    <p className="text-gray-600">
                      Hands-on sessions to develop your entrepreneurial skills.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
          </div>
        }
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/filled" element={<RegistrationSuccess />} />
    </Routes>
  );
}

export default App;