import React from 'react';
import { motion } from 'framer-motion';
import SmartPackages from '../components/services/SmartPackages';
import BrandPromotion from '../components/services/BrandPromotion';
import DesignSolutions from '../components/services/DesignSolutions';
import { Home, Business, AccountBalance, Build, Palette } from '@mui/icons-material';

const Services = () => {
  const services = [
    {
      title: 'NIR Smart Packages',
      description: 'Complete real estate solutions tailored to your needs.',
      icon: <Home />,
      path: '/services/smart-packages',
      color: '#1e88e5'
    },
    {
      title: 'Brand Promotion',
      description: 'Promote your real estate brand effectively.',
      icon: <Business />,
      path: '/services/brand-promotion',
      color: '#f4511e'
    },
    {
      title: 'Financial Services',
      description: 'Easy loan solutions and EMI calculations.',
      icon: <AccountBalance />,
      path: '/services/finance',
      color: '#2196f3'
    },
    {
      title: 'Construction Services',
      description: 'Professional construction and renovation services.',
      icon: <Build />,
      path: '/services/construction',
      color: '#4caf50'
    },
    {
      title: 'Design Solutions',
      description: 'Professional interior and architectural design services.',
      icon: <Palette />,
      path: '/services/design',
      color: '#9c27b0'
    }
  ];

  return (
    <div className="services-page">
      <section className="services-hero py-5 bg-light">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-5"
          >
            <h1 className="display-4 mb-4">Our Services</h1>
            <p className="lead text-muted">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </motion.div>
        </div>
      </section>

      <SmartPackages />
      <BrandPromotion />
      <DesignSolutions />
    </div>
  );
};

export default Services; 