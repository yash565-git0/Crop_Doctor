import React, { useState, useEffect } from "react";
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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

    if (!formData.username.trim()) newErrors.username = "Username is required";

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

  

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/v1/users/register`;
      await axios.post(apiUrl, {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate("/login");
    } catch (error) {
      setErrors({
        ...errors,
        form: error.response?.data?.message || "An error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  if (!mounted) return null;


 return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 relative overflow-hidden">
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">AS</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">AgriSmart</h1>
            <p className="text-green-600">Smart Agriculture Solutions</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-green-100 animate-slide-up">
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
            <form onSubmit={handleSubmit} className="space-y-6">
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
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-green-700 mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-green-50 border ${
                      errors.username ? "border-red-300" : "border-green-200"
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder-green-400`}
                    placeholder="Enter your username"
                    required
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username}
                  </p>
                )}
              </div>

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
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

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
              </button>
            </form>
            {errors.form && (
              <p className="text-red-500 text-sm mt-4 text-center">
                {errors.form}
              </p>
            )}
            <div className="text-center mt-8 pt-6 border-t border-green-100">
              <p className="text-green-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-green-700 font-semibold hover:text-green-800 transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
