import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <Box
      sx={{
        py: 10,
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url("/images/cta-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center'
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: 600, mb: 3 }}
          >
            Ready to Find Your Dream Property?
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, opacity: 0.9 }}
          >
            Let us help you make your real estate dreams a reality
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/contact"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              textTransform: 'none'
            }}
          >
            Contact Us Now
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CallToAction; 