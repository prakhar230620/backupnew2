import React from 'react';
import { Box, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box
        component={motion.main}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          flexGrow: 2,
          py: { xs: 4, md: 12 },
          bgcolor: theme.palette.background.default
        }}
      >
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>

      {/* Back to Top Button */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        sx={{
          text:'THE NEW INNOVATION REALITY',
          position: 'fixed',
          bottom: theme.spacing(4),
          right: theme.spacing(4),
          zIndex: 1000
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Box
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 3,
              '&:hover': {
                bgcolor: 'primary.dark'
              }
            }}
          >
            ↑
          </Box>
        </motion.div>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout; 