import React from 'react';
import { motion } from 'framer-motion';

const packages = [
  {
    id: 1,
    name: 'Basic Plan',
    price: '$99/month',
    features: [ 
      '20 LEADS VERIFIED', 
      'Basic property listing',
      'Email support',
      'Basic analytics',
      '1 Featured listing'
    ]
  },
  {
    id: 2,
    name: 'Plus Plan',
    price: '$199/month',
    features: [
      '70 LEADS VERIFIED',
      'Advanced property listing',
      '24/7 customers support',
      'NIR verified primium agrnt certificate',
      'high visability'
      
    ]
  },
  {
    id: 3,
    name: 'Star Plan',
    price: '4999/6month',
    features: [
      '180 leads verified',
      'Premium property listing',
      '24/7 customers support',
      'NIR verified primium agrnt certificate',
      'customer convenience package',
      'high visability',
      'rewards'
      
    ]
  },
  {
    id: 4,
    name: 'Premium Plan',
    price: '15999/year',
    features: [
      '360 leads verified',
      'property listing',
      'NIR verified primium agrnt certificate',
      'customer convenience package',
      'high visability',
      'rewards',
      '12 extra leads',
      'delearship certificate',
      '24/7 support',
      '24/7 office visit'
    ]
  }
];

const SmartPackages = () => {
  return (
    <section className="smart-packages-section py-5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <h2 className="section-title">NIR Smart Packages</h2>
          <p className="section-subtitle">
            Choose the perfect package for your real estate business
          </p>
        </motion.div>

        <div className="row g-4">
          {packages.map((pkg, index) => (
            <div key={pkg.id} className="col-md-6 col-lg-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="package-card h-100 p-4 rounded-4 bg-white shadow-sm"
              >
                <div className="package-header text-center mb-4">
                  <h3 className="package-name h4 mb-3">{pkg.name}</h3>
                  <div className="package-price h2 mb-0">{pkg.price}</div>
                </div>
                <ul className="package-features list-unstyled mb-4">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="mb-2">
                      <i className="fas fa-check text-success me-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary w-100">Select Plan</button>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartPackages; 