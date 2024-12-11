import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Link,
  Box,
  IconButton,
  useTheme,
  List,
  ListItem
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              NIR Real Estate
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your trusted partner in real estate solutions.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" component="a" href="https://facebook.com">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://twitter.com">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://instagram.com">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://linkedin.com">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://youtube.com">
                <YouTube />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <List>
              <ListItem>
                <Link
                  component={RouterLink}
                  to="/list-property"
                  color="inherit"
                  sx={{ textDecoration: 'none' }}
                >
                  List Your Property
                </Link>
              </ListItem>
              <ListItem>
                <Link component={RouterLink} to="/about" color="inherit" display="block" sx={{ mb: 1 }}>
                  About Us
                </Link>
              </ListItem>
              <ListItem>
                <Link component={RouterLink} to="/services" color="inherit" display="block" sx={{ mb: 1 }}>
                  Services
                </Link>
              </ListItem>
              <ListItem>
                <Link component={RouterLink} to="/projects" color="inherit" display="block" sx={{ mb: 1 }}>
                  Projects
                </Link>
              </ListItem>
              <ListItem>
                <Link component={RouterLink} to="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
                  Contact
                </Link>
              </ListItem>
            </List>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Our Services
            </Typography>
            <Link component={RouterLink} to="/services/smart-packages" color="inherit" display="block" sx={{ mb: 1 }}>
              NIR Smart Packages
            </Link>
            <Link component={RouterLink} to="/services/brand-promotion" color="inherit" display="block" sx={{ mb: 1 }}>
              Brand Promotion
            </Link>
            <Link component={RouterLink} to="/services/design" color="inherit" display="block" sx={{ mb: 1 }}>
              Design Solutions
            </Link>
            <Link component={RouterLink} to="/services/construction" color="inherit" display="block" sx={{ mb: 1 }}>
              Construction
            </Link>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', mb: 1 }}>
              <LocationOn sx={{ mr: 1 }} />
              <Typography variant="body2">
                123 Real Estate Avenue,
                <br />
                Business District,
                <br />
                Mumbai, Maharashtra 400001
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 1 }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body2">
                +91 98765 43210
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 1 }}>
              <Email sx={{ mr: 1 }} />
              <Typography variant="body2">
                info@nirrealestate.com
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ mt: 5, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="body2" align="center">
            © {currentYear} NIR Real Estate. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 