import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Snackbar
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Phone,
  Email,
  LocationOn,
  WhatsApp,
  AccessTime
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../utils/api';

// Contact form validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid phone number')
    .required('Phone number is required'),
  subject: Yup.string()
    .required('Subject is required')
    .min(5, 'Subject must be at least 5 characters'),
  message: Yup.string()
    .required('Message is required')
    .min(20, 'Message must be at least 20 characters')
});

const Contact = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await api.post('/contact', values);
        setSnackbar({
          open: true,
          message: 'Message sent successfully! We will contact you soon.',
          severity: 'success'
        });
        resetForm();
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to send message. Please try again.',
          severity: 'error'
        });
      } finally {
        setSubmitting(false);
      }
    }
  });

  const contactInfo = [
    {
      icon: <Phone />,
      title: 'Phone',
      details: ['+91 98765 43210', '+91 98765 43211'],
      action: 'tel:+919876543210'
    },
    {
      icon: <WhatsApp />,
      title: 'WhatsApp',
      details: ['+91 98765 43210'],
      action: 'https://wa.me/919876543210'
    },
    {
      icon: <Email />,
      title: 'Email',
      details: ['info@nirrealestate.com', 'support@nirrealestate.com'],
      action: 'mailto:info@nirrealestate.com'
    },
    {
      icon: <LocationOn />,
      title: 'Address',
      details: ['123 Real Estate Avenue', 'Business District', 'Mumbai, Maharashtra 400001'],
      action: 'https://maps.google.com/?q=Mumbai'
    },
    {
      icon: <AccessTime />,
      title: 'Business Hours',
      details: ['Monday - Saturday: 10:00 AM - 7:00 PM', 'Sunday: Closed'],
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 700 }}>
              Contact Us
            </Typography>
            <Typography variant="h5" align="center" sx={{ opacity: 0.9 }}>
              Get in touch with our expert team
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card elevation={3}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom>
                    Send us a Message
                  </Typography>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="name"
                          label="Your Name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.name && Boolean(formik.errors.name)}
                          helperText={formik.touched.name && formik.errors.name}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="email"
                          label="Email Address"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="phone"
                          label="Phone Number"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.phone && Boolean(formik.errors.phone)}
                          helperText={formik.touched.phone && formik.errors.phone}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="subject"
                          label="Subject"
                          value={formik.values.subject}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.subject && Boolean(formik.errors.subject)}
                          helperText={formik.touched.subject && formik.errors.subject}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          name="message"
                          label="Your Message"
                          value={formik.values.message}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.message && Boolean(formik.errors.message)}
                          helperText={formik.touched.message && formik.errors.message}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={formik.isSubmitting}
                          sx={{ mt: 2 }}
                        >
                          {formik.isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card elevation={3}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom>
                    Contact Information
                  </Typography>
                  <Box sx={{ mt: 4 }}>
                    {contactInfo.map((info, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          mb: 4,
                          '&:last-child': { mb: 0 }
                        }}
                      >
                        <Box
                          sx={{
                            mr: 2,
                            color: 'primary.main',
                            '& .MuiSvgIcon-root': { fontSize: 28 }
                          }}
                        >
                          {info.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {info.title}
                          </Typography>
                          {info.details.map((detail, i) => (
                            <Typography
                              key={i}
                              variant="body1"
                              color="text.secondary"
                              sx={{ mb: 0.5 }}
                            >
                              {detail}
                            </Typography>
                          ))}
                          {info.action && (
                            <Button
                              href={info.action}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{ mt: 1, textTransform: 'none' }}
                            >
                              Contact us
                            </Button>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Map Section */}
      <Box sx={{ height: '400px', mb: -8 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0088639689247!2d72.8662394!3d19.0759837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjUiTiA3MsKwNTEnNTguNSJF!5e0!3m2!1sen!2sin!4v1635835641006!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Office Location"
        />
      </Box>

      {/* Snackbar for form submission feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact; 