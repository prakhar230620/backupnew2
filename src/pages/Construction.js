import React from 'react';
import { motion } from 'framer-motion';

const constructionServices = [
  {
    id: 1,
    title: 'Residential Construction',
    image: '/images/construction/residential.jpg',
    description: 'Custom home building and residential property development'
  },
  {
    id: 2,
    title: 'Commercial Construction',
    image: '/images/construction/commercial.jpg',
    description: 'Office buildings and commercial space construction'
  },
  {
    id: 3,
    title: 'Renovation',
    image: '/images/construction/renovation.jpg',
    description: 'Property renovation and modernization services'
  },
  {
    id: 4,
    title: 'Interior Finishing',
    image: '/images/construction/interior.jpg',
    description: 'High-quality interior finishing and decoration'
  }
];

const Construction = () => {
  return (
    <div className="construction-page">
      <section className="construction-hero py-5 bg-light">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-5"
          >
            <h1 className="display-4 mb-4">Construction Services</h1>
            <p className="lead text-muted">
              Building your dreams with excellence and precision
            </p>
          </motion.div>
        </div>
      </section>

      <section className="construction-services py-5">
        <div className="container">
          <div className="row g-4">
            {constructionServices.map((service, index) => (
              <div key={service.id} className="col-md-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="service-card rounded-4 overflow-hidden shadow-sm"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-100"
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="p-4">
                    <h3 className="h4 mb-3">{service.title}</h3>
                    <p className="text-muted mb-0">{service.description}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-form py-5 bg-light">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="row justify-content-center"
          >
            <div className="col-md-8">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <h3 className="text-center mb-4">Get a Quote</h3>
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your Name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Your Email"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <select className="form-select">
                          <option>Select Service</option>
                          <option>Residential Construction</option>
                          <option>Commercial Construction</option>
                          <option>Renovation</option>
                          <option>Interior Finishing</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Project Details"
                          required
                        ></textarea>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                          Submit Request
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Construction; 