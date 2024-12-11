import React from 'react';
import { motion } from 'framer-motion';

const products = [
  {
    id: 1,
    image: '/images/products/product1.jpg',
    title: 'Luxury Villa',
    location: 'Beverly Hills',
    price: '$5,900,000',
    type: 'Residential'
  },
  {
    id: 2,
    image: '/images/products/product2.jpg',
    title: 'Modern Office Space',
    location: 'Downtown',
    price: '$2,500,000',
    type: 'Commercial'
  },
  {
    id: 3,
    image: '/images/products/product3.jpg',
    title: 'Seaside Apartment',
    location: 'Miami Beach',
    price: '$1,200,000',
    type: 'Residential'
  }
];

const Products = () => {
  return (
    <section className="products-section py-5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <h2 className="section-title">Featured Properties</h2>
          <p className="section-subtitle">
            Discover our handpicked selection of premium properties
          </p>
        </motion.div>

        <div className="row g-4">
          {products.map((product, index) => (
            <div key={product.id} className="col-md-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="product-card rounded-4 overflow-hidden shadow-sm"
              >
                <div className="product-image">
                  <img src={product.image} alt={product.title} className="w-100" />
                  <div className="product-type">{product.type}</div>
                </div>
                <div className="product-info p-4">
                  <h3 className="h5 mb-2">{product.title}</h3>
                  <p className="text-muted mb-2">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    {product.location}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="price h5 mb-0">{product.price}</span>
                    <button className="btn btn-outline-primary">View Details</button>
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

export default Products; 