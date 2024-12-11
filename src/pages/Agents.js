import React from 'react';
import { motion } from 'framer-motion';

const agents = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Senior Real Estate Agent',
    image: '/images/agents/agent1.jpg',
    rating: 4.8,
    deals: 150,
    contact: {
      phone: '+1 234 567 890',
      email: 'sarah@nirrealestate.com'
    }
  },
  // Add more agents...
];

const Agents = () => {
  return (
    <div className="agents-page">
      <section className="agents-hero py-5 bg-light">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-5"
          >
            <h1 className="display-4 mb-4">Our Agents</h1>
            <p className="lead text-muted">
              Meet our experienced real estate professionals
            </p>
          </motion.div>
        </div>
      </section>

      <section className="agents-grid py-5">
        <div className="container">
          <div className="row g-4">
            {agents.map((agent, index) => (
              <div key={agent.id} className="col-md-6 col-lg-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="agent-card rounded-4 overflow-hidden shadow-sm"
                >
                  <div className="agent-image">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-100"
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="agent-info p-4">
                    <h3 className="h5 mb-2">{agent.name}</h3>
                    <p className="text-muted mb-3">{agent.position}</p>
                    <div className="d-flex justify-content-between mb-3">
                      <div>
                        <i className="fas fa-star text-warning me-1"></i>
                        {agent.rating}
                      </div>
                      <div>
                        <i className="fas fa-handshake me-1"></i>
                        {agent.deals} deals
                      </div>
                    </div>
                    <hr />
                    <div className="contact-info">
                      <p className="mb-2">
                        <i className="fas fa-phone me-2"></i>
                        {agent.contact.phone}
                      </p>
                      <p className="mb-0">
                        <i className="fas fa-envelope me-2"></i>
                        {agent.contact.email}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Agents; 