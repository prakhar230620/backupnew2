import React, { useState } from 'react';
import { 
  Container, Grid, Typography, Box, Card, CardContent, Button,Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Lock } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import PaymentService from '../../services/payment.service';

const packages = [
  {
    id: 1,
    title: "Starter Brand",
    price: "₹1999",
    duration: "28 Days",
    features: [
      "20+ leads verified",
      "24/7 customers support",
      "5+ extra leads + pumplates",
      "40K people reach"
    ],
    recommended: false,
    color: '#1e88e5' // Blue
  },
  {
    id: 2,
    title: "Growth Brand",
    price: "₹2499",
    duration: "84 Days",
    features: [
      "30+ leads verified",
      "24/7 customers support",
      "10+ extra leads + pumplates",
      "45K people reach",
      "magzine"
    ],
    recommended: true,
    color: '#f4511e' // Deep Orange
  },
  {
    id: 3,
    title: "Professional Brand",
    price: "₹3999",
    duration: "180 Days",
    features: [
      "45+ leads verified",
      "24/7 customers support",
      "13+ extra leads + pumplates",
      "90K people reach",
      "magzine",
      "NIR verified primium agrnt certificate"
    ],
    recommended: false,
    color: '#43a047' // Green
  },
  {
    id: 4,
    title: "Enterprise Brand",
    price: "₹6999",
    duration: "365 Days",
    features: [
      "100+ leads verified",
      "24/7 customers support",
      "15+ extra leads + pumplates",
      "150K people reach",
      "magzine",
      "NIR verified primium agrnt certificate"
    ],
    recommended: false,
    color: '#6a1b9a' // Purple
  }
];

// PackageCard component (same structure as SmartPackages)
const PackageCard = ({ pkg, index, isLoggedIn, onSelect }) => (
  <Grid item xs={12} md={3}>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      style={{ height: '100%' }}
    >
      <Card 
        sx={{
          height: '100%',
          position: 'relative',
          borderTop: 5,
          borderColor: pkg.color,
          transition: 'all 0.3s ease-in-out',
          transform: pkg.recommended ? 'scale(1.05)' : 'none',
          boxShadow: pkg.recommended ? 6 : 1,
          '&:hover': {
            boxShadow: `0 8px 24px ${pkg.color}40`
          }
        }}
      >
        {pkg.recommended && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bgcolor: 'error.main',
              color: 'white',
              py: 0.5,
              textAlign: 'center',
              transform: 'translateY(-100%)',
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1
            }}
          >
            <Star fontSize="small" />
            <Typography variant="subtitle2" fontWeight="bold">
              Most Popular
            </Typography>
          </Box>
        )}
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom align="center" sx={{ color: pkg.color }}>
            {pkg.title}
          </Typography>
          <Typography 
            variant="h3" 
            align="center"
            sx={{ mb: 1, fontWeight: 700 }}
          >
            {pkg.price}
          </Typography>
          <Typography 
            variant="subtitle1" 
            align="center"
            sx={{ mb: 3, color: 'text.secondary' }}
          >
            {pkg.duration}
          </Typography>
          <Box sx={{ mb: 4 }}>
            {pkg.features.map((feature, i) => (
              <Box 
                key={i} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mb: 1.5 
                }}
              >
                <Check sx={{ mr: 1, color: pkg.color }} />
                <Typography variant="body2">{feature}</Typography>
              </Box>
            ))}
          </Box>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={() => onSelect(pkg)}
            startIcon={!isLoggedIn && <Lock />}
            sx={{ 
              mt: 2,
              borderColor: pkg.color,
              color: pkg.color,
              bgcolor: 'transparent',
              '&:hover': {
                bgcolor: `${pkg.color}10`,
                borderColor: pkg.color
              }
            }}
          >
            {isLoggedIn ? 'Choose Plan' : 'Login to Subscribe'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  </Grid>
);

const BrandPromotion = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    socialMedia: '',
    message: ''
  });

  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handlePackageSelect = (pkg) => {
    if (!isLoggedIn) {
      enqueueSnackbar('Please login to subscribe to a package', { 
        variant: 'warning',
        action: (
          <Button color="inherit" size="small" onClick={() => navigate('/login')}>
            Login
          </Button>
        )
      });
      return;
    }
    setSelectedPackage(pkg);
    setDialogOpen(true);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await PaymentService.initiatePackagePayment(
        selectedPackage.id,
        selectedPackage.price,
        {
          ...formData,
          packageType: 'brand-promotion'
        }
      );
      
      if (response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        throw new Error('Payment URL not received');
      }
    } catch (error) {
      enqueueSnackbar(error.message || 'Failed to initiate payment', { 
        variant: 'error' 
      });
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #f4511e 30%, #ff9800 90%)',
          color: 'white',
          py: 12,
          mb: 8
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 700 }}>
              Brand Promotion Packages
            </Typography>
            <Typography variant="h5" align="center" sx={{ opacity: 0.9 }}>
              Elevate your real estate brand with our comprehensive promotion solutions
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Packages Section */}
      <Container sx={{ mb: 8 }}>
        <Grid container spacing={4} alignItems="stretch">
          <AnimatePresence>
            {packages.map((pkg, index) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                index={index}
                isLoggedIn={isLoggedIn}
                onSelect={handlePackageSelect}
              />
            ))}
          </AnimatePresence>
        </Grid>
      </Container>

      {/* Subscription Form Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Subscribe to {selectedPackage?.title}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="company"
                  value={formData.company}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Website (if any)"
                  name="website"
                  value={formData.website}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Social Media Handles"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Requirements"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleFormChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            sx={{ bgcolor: selectedPackage?.color }}
          >
            Proceed to Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BrandPromotion; 