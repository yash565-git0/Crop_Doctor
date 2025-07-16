import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    console.log('Login attempt:', formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full">
          <div className="floating-particle w-4 h-4 bg-green-200 rounded-full opacity-30"></div>
        </div>
        <div className="absolute top-1/4 right-1/4 w-full h-full">
          <div className="floating-particle w-3 h-3 bg-amber-200 rounded-full opacity-40" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-full h-full">
          <div className="floating-particle w-2 h-2 bg-green-300 rounded-full opacity-25" style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      {/* Main Container */}
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">AS</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">AgriSmart</h1>
            <p className="text-green-600">Smart Agriculture Solutions</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-green-100 animate-slide-up">
            {/* Welcome Message */}
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-gradient-to-r from-green-100 to-amber-100 rounded-xl mb-4">
                <span className="text-2xl">👋</span>
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Welcome Back!</h2>
              <p className="text-green-600">We are really happy to see you again!</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div className="relative">
                <label htmlFor="username" className="block text-sm font-medium text-green-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-green-50 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder-green-400"
                    placeholder="Enter your username"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className="w-5 h-5 text-green-400">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-green-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-green-50 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder-green-400 pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-400 hover:text-green-600 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-green-300 text-green-600 focus:ring-green-500 focus:ring-offset-0"
                  />
                  <span className="ml-2 text-sm text-green-700">Remember me</span>
                </label>
                <a href="#" className="text-sm text-green-600 hover:text-green-800 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-8 pt-6 border-t border-green-100">
              <p className="text-green-600">
                Don't have an account?{' '}
                <a href="#" className="text-green-700 font-semibold hover:text-green-800 transition-colors duration-200">
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out 0.2s both;
        }

        .floating-particle {
          animation: float 6s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #16a34a, #a16207);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        input:focus {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(34, 197, 94, 0.15);
        }

        button:active {
          transform: scale(0.98);
        }

        .backdrop-blur-xl {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        @media (max-width: 640px) {
          .floating-particle {
            animation: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;