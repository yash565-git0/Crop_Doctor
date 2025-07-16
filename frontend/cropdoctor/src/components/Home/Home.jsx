import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Leaf,
  BarChart3,
  Shield,
  Users,
  Plus,
  Minus,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";

const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const signupBtn = document.getElementById("signup-btn");
    const getStartedBtn = document.getElementById("get-started-btn");

    if (getStartedBtn) {
      getStartedBtn.addEventListener("click", () => {
        if (signupBtn) {
          signupBtn.scrollIntoView({ behavior: "smooth" });
          signupBtn.classList.add("animate-pulse");
          setTimeout(() => {
            signupBtn.classList.remove("animate-pulse");
          }, 2000);
        }
      });
    }
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "How does AgriSmart's AI model work?",
      answer:
        "Our AI model uses advanced machine learning algorithms trained on vast agricultural datasets. It analyzes soil conditions, weather patterns, crop health indicators, and historical data to provide precise recommendations for planting, irrigation, fertilization, and pest management.",
    },
    {
      question: "What can AgriSmart help me achieve?",
      answer:
        "AgriSmart helps optimize crop yields, reduce resource waste, predict weather impacts, monitor soil health, detect diseases early, automate irrigation systems, and provide data-driven insights for better decision making. Our platform can increase productivity by up to 40% while reducing costs by 25%.",
    },
    {
      question: "Is AgriSmart suitable for small farms?",
      answer:
        "Absolutely! AgriSmart is designed to scale from small family farms to large commercial operations. Our flexible pricing and modular features ensure that farmers of all sizes can benefit from our technology without overwhelming complexity or costs.",
    },
    {
      question: "How accurate are the predictions?",
      answer:
        "Our AI model maintains 95% accuracy in crop yield predictions and 92% accuracy in disease detection. We continuously improve our algorithms using real-time data and feedback from our farming community worldwide.",
    },
    {
      question: "What support do you provide?",
      answer:
        "We offer 24/7 technical support, comprehensive training programs, regular webinars, and a dedicated agronomist team. Our support includes initial setup, ongoing maintenance, and personalized consultation for your specific farming needs.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">
                AgriSmart
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-green-700 hover:text-green-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-green-700 hover:text-green-900 transition-colors"
              >
                About
              </a>
              <a
                href="#faq"
                className="text-green-700 hover:text-green-900 transition-colors"
              >
                FAQ
              </a>
              <a
                href="#contact"
                className="text-green-700 hover:text-green-900 transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Animated Login/Signup Buttons */}
            <div className="flex space-x-4">
              <button className="relative overflow-hidden px-6 py-3 text-green-700 border-2 border-green-300 rounded-full hover:bg-green-50 transition-all duration-500 group transform hover:scale-110 shadow-lg hover:shadow-green-300/50">
                <span className="relative z-10 font-semibold">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-green-300 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full"></div>
              </button>
              <button
                id="signup-btn"
                className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-500 group transform hover:scale-110 shadow-lg hover:shadow-green-500/50 font-semibold"
              >
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-amber-50"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        ></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full opacity-40 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-green-100 to-green-200 rounded-full opacity-25 animate-pulse"></div>
          <div className="absolute top-60 right-1/3 w-16 h-16 bg-gradient-to-br from-green-300 to-green-400 rounded-full opacity-20 animate-ping"></div>
          <div className="absolute bottom-40 right-10 w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full opacity-30 animate-pulse"></div>

          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-green-500 rounded-full animate-ping"></div>

          {/* Sparkle effects */}
          <div className="absolute top-32 left-1/2 animate-spin">
            <Sparkles className="h-6 w-6 text-green-300 opacity-60" />
          </div>
          <div
            className="absolute top-3/4 right-1/3 animate-spin"
            style={{ animationDelay: "1s" }}
          >
            <Sparkles className="h-4 w-4 text-amber-300 opacity-50" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-green-800 mb-6 leading-tight">
              <span className="inline-block animate-pulse">Smart</span>{" "}
              <span className="inline-block" style={{ animationDelay: "0.2s" }}>
                Farming
              </span>
              <br />
              <span
                className="text-amber-600 inline-block animate-bounce"
                style={{ animationDelay: "0.4s" }}
              >
                Solutions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-700 mb-8 max-w-3xl mx-auto">
              Revolutionize your agriculture with AI-powered insights, precision
              farming, and sustainable practices that maximize yield while
              protecting our planet.
            </p>
            <div className="flex justify-center">
              <button
                id="get-started-btn"
                className="group relative px-12 py-5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-green-500/50 font-semibold text-lg"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Today
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-green-600" />
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-white to-green-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-green-700 max-w-2xl mx-auto">
              Everything you need to transform your farming operations with
              cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: "AI-Powered Analytics",
                description:
                  "Advanced machine learning algorithms analyze your farm data to provide actionable insights and predictions for optimal crop management.",
              },
              {
                icon: Shield,
                title: "Precision Monitoring",
                description:
                  "Real-time monitoring of soil health, weather conditions, and crop status with IoT sensors and satellite imagery integration.",
              },
              {
                icon: Users,
                title: "Expert Support",
                description:
                  "24/7 access to agricultural experts and agronomists who provide personalized guidance and support for your farming operations.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 border border-green-100"
              >
                <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-10 w-10 text-green-600 group-hover:animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-green-700 group-hover:text-green-800 transition-colors duration-300">
                  {feature.description}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="h-5 w-5 text-green-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "20+", label: "Active Farmers" },
              { number: "40%", label: "Yield Increase" },
              { number: "25%", label: "Cost Reduction" },
              { number: "95%", label: "Accuracy Rate" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group transform hover:scale-110 transition-all duration-500 hover:bg-white/10 p-6 rounded-2xl backdrop-blur-sm"
              >
                <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent group-hover:animate-pulse">
                  {stat.number}
                </div>
                <div className="text-green-100 group-hover:text-white transition-colors duration-300 text-lg">
                  {stat.label}
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-green-300 to-green-400 mx-auto mt-2 rounded-full group-hover:w-16 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
                The Future of Agriculture is Here
              </h2>
              <p className="text-lg text-green-700 mb-6">
                AgriSmart combines the power of artificial intelligence,machine
                learning and satellite imagery to revolutionize farming
                practices. Our platform helps farmers make data-driven decisions
                that increase productivity while promoting sustainable
                agriculture.
              </p>
              <div className="space-y-4">
                {[
                  "AI-powered crop recommendations",
                  "Real-time weather and soil monitoring",
                  "Automated irrigation systems",
                  "Disease and pest detection",
                  "Yield prediction and optimization",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-8 shadow-2xl transform rotate-3 group-hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="bg-white rounded-2xl p-8 space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    <div
                      className="w-4 h-4 bg-amber-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-4 h-4 bg-red-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gradient-to-r from-green-100 to-green-200 rounded-full w-3/4 animate-pulse"></div>
                    <div
                      className="h-6 bg-gradient-to-r from-green-100 to-green-200 rounded-full w-1/2 animate-pulse"
                      style={{ animationDelay: "0.3s" }}
                    ></div>
                    <div
                      className="h-6 bg-gradient-to-r from-green-100 to-green-200 rounded-full w-5/6 animate-pulse"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
                    <BarChart3 className="h-16 w-16 text-green-600 mx-auto animate-bounce" />
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <div className="w-8 h-2 bg-green-300 rounded-full"></div>
                        <div className="w-12 h-2 bg-green-400 rounded-full"></div>
                        <div className="w-6 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="w-10 h-2 bg-green-200 rounded-full"></div>
                        <div className="w-8 h-2 bg-green-300 rounded-full"></div>
                        <div className="w-14 h-2 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-green-700">
              Everything you need to know about AgriSmart
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-green-50 transition-colors duration-300"
                >
                  <span className="font-semibold text-green-800 text-lg">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <Minus className="h-5 w-5 text-green-600" />
                  ) : (
                    <Plus className="h-5 w-5 text-green-600" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-green-700 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join farmers who are already using AgriSmart to increase yields,
            reduce costs, and farm more sustainably.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-8 w-8 text-green-400" />
                <span className="text-2xl font-bold">AgriSmart</span>
              </div>
              <p className="text-green-300">
                Revolutionizing agriculture through smart technology and
                sustainable practices.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-green-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-green-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Training
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-green-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-300">
            <p>&copy; 2025 AgriSmart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;