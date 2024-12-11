import React from 'react';
import { motion } from 'framer-motion';

const designServices = [
  {
    title: "Interior Design",
    description: "Transform your space with our expert interior design services. We create beautiful, functional spaces tailored to your lifestyle.",
    icon: "🏠"
  },
  {
    title: "3D Visualization",
    description: "See your dream space before it's built with our cutting-edge 3D visualization technology.",
    icon: "🎨"
  },
  {
    title: "Space Planning",
    description: "Optimize your space with our professional planning services. We ensure efficient and practical layouts.",
    icon: "📐"
  },
  {
    title: "Custom Furniture",
    description: "Get unique, made-to-measure furniture that perfectly fits your space and style.",
    icon: "🪑"
  }
];

const DesignSolutions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Design Solutions
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Transform your space with our professional design services
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {designServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-medium text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default DesignSolutions; 