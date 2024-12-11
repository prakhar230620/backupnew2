import React from 'react';
import { motion } from 'framer-motion';

const designServices = [
  {
    id: 1,
    icon: 'fas fa-home',
    title: 'Residential Design',
    description: 'Custom home designs and interior solutions for residential properties'
  },
  {
    id: 2,
    icon: 'fas fa-building',
    title: 'Commercial Design',
    description: 'Modern office spaces and commercial property design solutions'
  },
  {
    id: 3,
    icon: 'fas fa-pencil-ruler',
    title: 'Architectural Planning',
    description: 'Comprehensive architectural planning and 3D visualization'
  },
  {
    id: 4,
    icon: 'fas fa-paint-roller',
    title: 'Interior Design',
    description: 'Luxurious interior design and decoration services'
  }
];

const DesignSolutions = () => {
  return (
    <section className="design-solutions-section py-5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <h2 className="section-title">Design Solutions</h2>
          <p className="section-subtitle">
            Professional design services for all your real estate needs
          </p>
        </motion.div>

        <div className="row g-4">
          {designServices.map((service, index) => (
            <div key={service.id} className="col-md-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="design-card p-4 rounded-4 bg-white shadow-sm"
              >
                <div className="d-flex align-items-center mb-4">
                  <div className="design-icon me-4">
                    <i className={`${service.icon} fa-2x text-primary`}></i>
                  </div>
                  <div>
                    <h3 className="h5 mb-2">{service.title}</h3>
                    <p className="text-muted mb-0">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignSolutions; 