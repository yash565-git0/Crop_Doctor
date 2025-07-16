import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const CropRecords = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [crops, setCrops] = useState([
    {
      id: 1,
      name: "Corn Field A",
      type: "Corn",
      location: "North Field • 50 acres",
      planted: "4/15/2024",
      stage: "Flowering",
      status: "good",
      health: 85,
      image: "/api/placeholder/300/200",
      recommendations: [
        "Ensure adequate water supply during flowering",
        "Monitor for pest activity",
      ],
    },
    {
      id: 2,
      name: "Wheat Field B",
      type: "Wheat",
      location: "South Field • 75 acres",
      planted: "3/20/2024",
      stage: "Grain Filling",
      status: "excellent",
      health: 95,
      image: "/api/placeholder/300/200",
      recommendations: [
        "Begin harvest preparation",
        "Check grain moisture levels",
      ],
    },
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const filteredCrops = crops.filter((crop) => {
    const matchesSearch =
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || crop.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">
                Crop Records Management
              </h2>
              <p className="text-green-100 text-lg">
                Track, monitor, and manage your crop lifecycle with AI-powered
                insights
              </p>
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-green-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search crops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/80 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <FunnelIcon className="w-5 h-5 text-green-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 bg-white/80 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Status</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="needs-attention">Needs Attention</option>
              </select>
            </div>
          </div>

          {/* Add New Crop Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 hover:from-green-700 hover:to-green-800 transition-all duration-300"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add New Crop</span>
          </motion.button>
        </motion.div>

        {/* Crop Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredCrops.map((crop) => (
            <motion.div
              key={crop.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl border border-green-100 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Crop Image */}
              <div className="relative h-48 bg-gradient-to-r from-green-200 to-amber-200">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      crop.status === "excellent"
                        ? "bg-green-100 text-green-700"
                        : crop.status === "good"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {crop.status}
                  </span>
                </div>
              </div>

              {/* Crop Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-green-800">
                      {crop.name}
                    </h3>
                    <p className="text-green-600">{crop.type}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-green-600">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    <span>{crop.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <CalendarDaysIcon className="w-4 h-4 mr-2" />
                    <span>Planted: {crop.planted}</span>
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <ChartBarIcon className="w-4 h-4 mr-2" />
                    <span>Stage: {crop.stage}</span>
                  </div>
                </div>

                {/* Health Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-green-700">Health Score</span>
                    <span className="text-sm font-medium text-green-800">
                      {crop.health}%
                    </span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <motion.div
                      className="bg-green-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${crop.health}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">
                    AI Recommendations
                  </h4>
                  <div className="space-y-1">
                    {crop.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-blue-700">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Update Status
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredCrops.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChartBarIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-green-800 mb-2">
              No crops found
            </h3>
            <p className="text-green-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Add Your First Crop
            </motion.button>
          </motion.div>
        )}
      </main>

      {/* Add Crop Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-green-800 mb-6">
                Add New Crop
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Crop Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-green-50 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Corn Field C"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Crop Type
                  </label>
                  <select className="w-full px-4 py-3 bg-green-50 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>Select crop type</option>
                    <option>Corn</option>
                    <option>Wheat</option>
                    <option>Rice</option>
                    <option>Soybeans</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-green-50 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Field location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Size (acres)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-green-50 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Planting Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-green-50 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Add Crop
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CropRecords;