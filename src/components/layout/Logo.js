import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = () => {
  // Option 1: SVG Logo
  const svgLogo = `data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="%231976d2"/>
      <text x="25" y="25" font-family="Arial" font-size="12" fill="white" text-anchor="middle" dy=".3em">NIR</text>
    </svg>`;

  return (
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        '&:hover': {
          opacity: 0.9
        }
      }}>
        {/* Option 2: Using PNG/JPG Logo */}
<Box
  component="img"
  src={`${process.env.PUBLIC_URL}/images/logo.png`}
  alt="NIR Logo"
  sx={{
    height: '45px',
    width: '45px',
    objectFit: 'cover',
    borderRadius: '8px', // यहाँ नंबर को बदलकर आप कॉर्नर की राउंडनेस को एडजस्ट कर सकते हैं
    border: '2px solid #1976d2', // Optional: adds a border
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Optional: adds subtle shadow
  }}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = svgLogo;
  }}
/>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'primary.main',
            textDecoration: 'none',
            display: { xs: 'none', sm: 'block' },
            letterSpacing: '0.5px',
            textTransform: 'none',
            fontSize: '1.2rem',
            marginLeft: 1
          }}
        >
          The Next Innovation Reality
        </Typography>
      </Box>
    </Link>
  );
};

export default Logo;