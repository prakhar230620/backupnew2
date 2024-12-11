import React from 'react';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: 'John Smith',
    rating: 5,
    comment: 'Excellent service and professional team!',
    date: '2024-02-15',
    image: '/images/reviews/person1.jpg'
  },
  // Add more reviews...
];

const Reviews = () => {
  return (
    <div className="reviews-page">
      <section className="reviews-hero py-5 bg-light">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-5"
          >
            <h1 className="display-4 mb-4">Client Reviews</h1>
            <p className="lead text-muted">
              What our clients say about our services
            </p>
          </motion.div>
        </div>
      </section>

      <section className="reviews-grid py-5">
        <div className="container">
          <div className="row g-4">
            {reviews.map((review, index) => (
              <div key={review.id} className="col-md-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="review-card p-4 rounded-4 bg-white shadow-sm"
                >
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="rounded-circle me-3"
                      width="60"
                    />
                    <div>
                      <h3 className="h5 mb-1">{review.name}</h3>
                      <div className="text-warning">
                        {[...Array(review.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mb-2">{review.comment}</p>
                  <small className="text-muted">
                    {new Date(review.date).toLocaleDateString()}
                  </small>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews; 