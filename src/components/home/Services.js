import React from 'react';
import { Container, Grid, Typography, Card, CardContent, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Home,
  Business,
  Brush,
  Construction,
  AttachMoney,
  Apartment
} from '@mui/icons-material';

const services = [
  {
    icon: <Home sx={{ fontSize: 40 }} />,
    title: 'NIR Smart Packages',
    description: 'Complete real estate solutions tailored to your needs with smart investment options.',
    link: '/services/smart-packages'
  },
  {
    icon: <Business sx={{ fontSize: 40 }} />,
    title: 'NIR Smart Brand Promotion',
    description: 'Promote your real estate brand with our comprehensive marketing solutions.',
    link: '/services/brand-promotion'
  },
  {
    icon: <Brush sx={{ fontSize: 40 }} />,
    title: 'NIR Smart Design & Solutions',
    description: 'Expert interior and exterior design services for your property.',
    link: '/services/design'
  },
  {
    icon: <Construction sx={{ fontSize: 40 }} />,
    title: 'NIR Smart Construction',
    description: 'Quality construction services with modern techniques and materials.',
    link: '/services/construction'
  },
  {
    icon: <AttachMoney sx={{ fontSize: 40 }} />,
    title: 'NIR Smart Financial Services',
    description: 'Easy loan solutions and financial consultation for property investment.',
    link: '/services/finance'
  }
];

const Services = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, mb: 6 }}
          >
            Our Services
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Box
                      sx={{
                        mb: 2,
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: '50%',
                        bgcolor: 'primary.light',
                        color: 'primary.main'
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {service.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      href={service.link}
                      sx={{ mt: 'auto' }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services; 