import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography 
} from '@mui/material';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import FeaturedProperties from '../components/home/FeaturedProperties';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';

// Stats section
const Stats = () => {
  const stats = [
    { number: '1000+', label: 'Properties Listed' },
    { number: '500+', label: 'Happy Clients' },
    { number: '50+', label: 'Expert Agents' },
    { number: '10+', label: 'Years Experience' }
  ];

  return (
    <Box sx={{ py: 8, bgcolor: 'primary.main', color: 'white' }}>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index} sx={{ textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {stat.number}
                </Typography>
                <Typography variant="h6">
                  {stat.label}
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <Stats />

      {/* Services Section */}
      <Services />

      {/* Featured Properties */}
      <FeaturedProperties />

      {/* Testimonials */}
      <Testimonials />

      {/* Call to Action */}
      <CallToAction />
    </Box>
  );
};

export default Home; 