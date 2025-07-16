import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    farmSize: "",
    location: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    console.log("Signup attempt:", formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          <div
            className="floating-particle w-3 h-3 bg-amber-200 rounded-full opacity-40"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-full h-full">
          <div
            className="floating-particle w-2 h-2 bg-green-300 rounded-full opacity-25"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>
      </div>

      {/* Main Container */}
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
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

          {/* Signup Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-green-100 animate-slide-up">
            {/* Welcome Message */}
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-gradient-to-r from-green-100 to-amber-100 rounded-xl mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                Join AgriSmart
              </h2>
              <p className="text-green-600">
                Start your journey to smarter farming today!
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <div className="relative">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-green-700 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-green-50 border ${
                      errors.fullName ? "border-red-300" : "border-green-200"
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder-green-400`}
                    placeholder="Enter your full name"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className="w-5 h-5 text-green-400">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-green-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-green-50 border ${
                      errors.email ? "border-red-300" : "border-green-200"
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder-green-400`}
                    placeholder="Enter your email address"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className="w-5 h-5 text-green-400">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="relative">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-green-700 mb-2"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-green-50 border ${
                      errors.phoneNumber ? "border-red-300" : "border-green-200"
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder-green-400`}
                    placeholder="Enter your phone number"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className="w-5 h-5 text-green-400">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Location and Farm Size Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Location Field */}
                <div className="relative">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-green-700 mb-2"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-green-50 border ${
                      errors.location ? "border-red-300" : "border-green-200"
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder-green-400`}
                    placeholder="Your location"
                    required
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Farm Size Field */}
                <div className="relative">
                  <label
                    htmlFor="farmSize"
                    className="block text-sm font-medium text-green-700 mb-2"
                  >
                    Farm Size (acres)
                  </label>
                  <input
                    type="number"
                    id="farmSize"
                    name="farmSize"
                    value={formData.farmSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-green-50 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder-green-400"
                    placeholder="Farm size"
                    min="0"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-green-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-green-50 border ${
                      errors.password ? "border-red-300" : "border-green-200"
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder-green-400 pr-12`}
                    placeholder="Create a password"
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
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-green-700 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-green-50 border ${
                      errors.confirmPassword
                        ? "border-red-300"
                        : "border-green-200"
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder-green-400 pr-12`}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-400 hover:text-green-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 rounded border-green-300 text-green-600 focus:ring-green-500 focus:ring-offset-0"
                />
                <label
                  htmlFor="agreeToTerms"
                  className="ml-2 text-sm text-green-700"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-green-600 hover:text-green-800 underline"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-green-600 hover:text-green-800 underline"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
              )}

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-8 pt-6 border-t border-green-100">
              <p className="text-green-600">
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-green-700 font-semibold hover:text-green-800 transition-colors duration-200"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(120deg);
          }
          66% {
            transform: translateY(5px) rotate(240deg);
          }
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

export default SignupPage;