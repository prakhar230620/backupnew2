import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Paper,
  Autocomplete
} from '@mui/material';
import {
  Search,
  LocationOn,
  Add
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Background images for slider
  const backgroundImages = [
    '/images/hero-bg-1.jpg',
    '/images/hero-bg-2.jpg',
    '/images/hero-bg-3.jpg'
  ];

  // Sample locations for autocomplete
  const locations = [
    'Mumbai, Maharashtra',
    'Pune, Maharashtra',
    'Thane, Maharashtra',
    'Nashik, Maharashtra',
    'Nagpur, Maharashtra'
  ];

  // Auto slide change
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <Box 
      className="hero-section" 
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        height: '85vh',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 100%)',
          zIndex: 1
        }
      }}
    >
      {/* Background Slider */}
      {backgroundImages.map((img, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentSlide === index ? 1 : 0,
            scale: currentSlide === index ? 1 : 1.1
          }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: currentSlide === index ? 1 : 0
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7)'
            }}
          />
        </motion.div>
      ))}

      {/* Content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          height: '100%',
          pt: { xs: 8, md: 0 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Grid 
          container 
          sx={{ 
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <Grid 
            item 
            xs={12} 
            md={10} 
            lg={8}
            sx={{
              textAlign: 'center'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem', lg: '3.5rem' },
                  mb: { xs: 2, md: 3 },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  lineHeight: 1.2,
                  textAlign: 'center'
                }}
              >
                Find Your Dream Property
                <Box
                  component="span"
                  sx={{
                    color: 'primary.main',
                    display: 'block',
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    mt: 1
                  }}
                >
                  In Prime Locations
                </Box>
              </Typography>

              {/* Search Box */}
              <Box sx={{ 
                maxWidth: '700px',
                mx: 'auto'
              }}>
                <Paper
                  elevation={5}
                  sx={{
                    p: { xs: 2, md: 2.5 },
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 2
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                      <TextField
                        fullWidth
                        size="medium"
                        placeholder="Property Type"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search color="primary" />
                            </InputAdornment>
                          )
                        }}
                        sx={{ 
                          bgcolor: 'white',
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Autocomplete
                        value={location}
                        onChange={(event, newValue) => setLocation(newValue)}
                        options={locations}
                        size="medium"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select Location"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LocationOn color="primary" />
                                </InputAdornment>
                              )
                            }}
                            sx={{ bgcolor: 'white' }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={() => navigate('/projects')}
                        sx={{
                          height: '100%',
                          minHeight: '56px',
                          boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                          '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: '0 6px 20px rgba(0,118,255,0.23)'
                          }
                        }}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>

              {/* Action Buttons */}
              <Box 
                sx={{ 
                  mt: 4, 
                  display: 'flex', 
                  gap: 2,
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  justifyContent: 'center'
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Add />}
                  onClick={() => navigate('/list-property')}
                  sx={{ 
                    py: 1.5,
                    px: 3,
                    flex: { xs: '1 1 100%', sm: '0 1 auto' },
                    fontSize: '1rem',
                    boxShadow: '0 4px 14px 0 rgba(255,152,0,0.39)',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 20px rgba(255,152,0,0.23)'
                    }
                  }}
                >
                  List Your Property
                </Button>
                <Button
                  variant="outlined"
                  sx={{ 
                    color: 'white', 
                    borderColor: 'white',
                    py: 1.5,
                    px: 3,
                    flex: { xs: '1 1 100%', sm: '0 1 auto' },
                    fontSize: '1rem',
                    borderWidth: '2px',
                    '&:hover': {
                      borderColor: 'white',
                      borderWidth: '2px',
                      bgcolor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                  onClick={() => navigate('/contact')}
                >
                  Contact Us
                </Button>
              </Box>

              {/* Stats Section */}
              <Box 
                sx={{ 
                  mt: 6,
                  display: 'flex',
                  gap: { xs: 3, md: 5 },
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                {[
                  { number: '1000+', label: 'Properties' },
                  { number: '500+', label: 'Happy Clients' },
                  { number: '50+', label: 'Expert Agents' },
                  { number: '10+', label: 'Years Experience' }
                ].map((stat, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      textAlign: 'center',
                      flex: { xs: '1 1 40%', sm: '1 1 auto' }
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: 'primary.main',
                        fontWeight: 700,
                        mb: 0.5
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: 'white',
                        opacity: 0.9
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Slide Indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          gap: 1
        }}
      >
        {backgroundImages.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentSlide(index)}
            sx={{
              width: 25,
              height: 3,
              bgcolor: currentSlide === index ? 'primary.main' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: currentSlide === index ? 'primary.main' : 'rgba(255,255,255,0.8)',
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Hero; 