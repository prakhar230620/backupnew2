import React from 'react';
import { motion } from 'framer-motion';

const promotionPlans = [
  {
    id: 1,
    name: 'Basic Promotion',
    price: '$299',
    duration: '1 month',
    features: [
      'Social media promotion',
      'Basic SEO optimization',
      'Email marketing campaign',
      'Monthly performance report'
    ]
  },
  {
    id: 2,
    name: 'Advanced Promotion',
    price: '$599',
    duration: '3 months',
    features: [
      'Enhanced social media presence',
      'Advanced SEO optimization',
      'Email & SMS marketing',
      'Weekly performance reports',
      'Content marketing',
      'Google Ads campaign'
    ]
  },
  {
    id: 3,
    name: 'Premium Promotion',
    price: '$999',
    duration: '6 months',
    features: [
      'Complete digital marketing',
      'Premium SEO package',
      'Multi-channel marketing',
      'Real-time analytics',
      'Content creation & strategy',
      'PPC campaigns',
      'Brand identity development'
    ]
  }
];

const BrandPromotion = () => {
  return (
    <section className="brand-promotion-section py-5 bg-light">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <h2 className="section-title">Brand Promotion</h2>
          <p className="section-subtitle">
            Boost your real estate brand visibility with our promotion packages
          </p>
        </motion.div>

        <div className="row g-4">
          {promotionPlans.map((plan, index) => (
            <div key={plan.id} className="col-md-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="promotion-card h-100 p-4 rounded-4 bg-white shadow-sm"
              >
                <div className="promotion-header text-center mb-4">
                  <h3 className="promotion-name h4 mb-3">{plan.name}</h3>
                  <div className="promotion-price h2 mb-2">{plan.price}</div>
                  <div className="promotion-duration text-muted">{plan.duration}</div>
                </div>
                <ul className="promotion-features list-unstyled mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="mb-2">
                      <i className="fas fa-check text-success me-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary w-100">Get Started</button>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandPromotion; 