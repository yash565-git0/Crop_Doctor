import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CameraIcon,
  CloudArrowUpIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const DiseaseDetection = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [cropName, setCropName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setResults(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !cropName) return;

    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setResults({
      disease: "Corn Leaf Blight",
      confidence: 94,
      severity: "Moderate",
      recommendations: [
        "Apply fungicide treatment immediately",
        "Improve field drainage to reduce moisture",
        "Remove infected plant debris",
        "Monitor neighboring plants for spread",
      ],
      treatment: {
        product: "Azoxystrobin-based fungicide",
        dosage: "2-3 fl oz per acre",
        timing: "Apply every 14 days until symptoms subside",
      },
    });

    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-xl border-b border-green-100 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 180 }}
                className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center mr-3"
              >
                <span className="text-white font-bold">AS</span>
              </motion.div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">
                AgriSmart
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">JF</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-green-800">
                  {user?.name}
                </p>
                <p className="text-xs text-green-600">{user?.farm}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">AI Disease Detection</h2>
              <p className="text-blue-100 text-lg">
                Upload crop photos for instant health analysis and treatment
                recommendations
              </p>
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-green-100"
            >
              <h3 className="text-xl font-semibold text-green-800 mb-6">
                Upload Crop Image
              </h3>

              {/* Crop Name Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-green-700 mb-2">
                  Crop Name
                </label>
                <input
                  type="text"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  placeholder="e.g., Corn Field A, Wheat Section 2"
                  className="w-full px-4 py-3 bg-green-50 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* File Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? "border-green-400 bg-green-50"
                    : "border-green-200 bg-green-50/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />

                {selectedFile ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                      <CheckCircleIcon className="w-10 h-10 text-green-600" />
                    </div>
                    <div>
                      <p className="text-green-800 font-medium">
                        {selectedFile.name}
                      </p>
                      <p className="text-green-600 text-sm">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                      <CloudArrowUpIcon className="w-10 h-10 text-green-600" />
                    </div>
                    <div>
                      <p className="text-green-800 font-medium">
                        Drop your crop image here
                      </p>
                      <p className="text-green-600 text-sm">
                        or click to browse files
                      </p>
                      <p className="text-green-500 text-xs mt-2">
                        JPG, PNG, WEBP • Max 10MB
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Analyze Button */}
              <motion.button
                onClick={handleAnalyze}
                disabled={!selectedFile || !cropName || isAnalyzing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  !selectedFile || !cropName || isAnalyzing
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl"
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Analyzing for Diseases...
                  </div>
                ) : (
                  "Analyze for Diseases"
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Tips Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100"
            >
              <h3 className="text-lg font-semibold text-green-800 mb-4">
                Photography Tips
              </h3>

              <div className="space-y-4">
                {[
                  {
                    icon: CameraIcon,
                    title: "High-quality, focused images",
                    detail:
                      "Gemini AI works best with clear, detailed crop photos",
                  },
                  {
                    icon: InformationCircleIcon,
                    title: "Good lighting",
                    detail: "Take photos in natural daylight when possible",
                  },
                  {
                    icon: ExclamationTriangleIcon,
                    title: "Close-up shots",
                    detail:
                      "Include affected areas and surrounding healthy tissue",
                  },
                  {
                    icon: CheckCircleIcon,
                    title: "Include affected areas",
                    detail:
                      "Show both healthy and problematic parts for accurate diagnosis",
                  },
                ].map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <tip.icon className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        {tip.title}
                      </p>
                      <p className="text-xs text-green-600">{tip.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-green-100">
                <h3 className="text-xl font-semibold text-green-800 mb-6">
                  Analysis Results
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Disease Detection */}
                  <div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-red-800">
                          Disease Detected
                        </h4>
                        <span className="text-sm text-red-600">
                          {results.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-red-700 text-lg font-semibold">
                        {results.disease}
                      </p>
                      <p className="text-red-600 text-sm">
                        Severity: {results.severity}
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">
                        Treatment
                      </h4>
                      <p className="text-blue-700 text-sm mb-1">
                        <strong>Product:</strong> {results.treatment.product}
                      </p>
                      <p className="text-blue-700 text-sm mb-1">
                        <strong>Dosage:</strong> {results.treatment.dosage}
                      </p>
                      <p className="text-blue-700 text-sm">
                        <strong>Timing:</strong> {results.treatment.timing}
                      </p>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-medium text-green-800 mb-3">
                      AI Recommendations
                    </h4>
                    <div className="space-y-2">
                      {results.recommendations.map((rec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-start space-x-2 p-2 bg-green-50 rounded-lg"
                        >
                          <CheckCircleIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-green-700">{rec}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default DiseaseDetection;