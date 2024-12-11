import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  useTheme,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';

// Navigation pages and services
const pages = ['Home', 'Services', 'Projects', 'About', 'Contact'];
const serviceItems = [
  { text: 'Smart Packages', path: '/services/smart-packages' },
  { text: 'Brand Promotion', path: '/services/brand-promotion' },
  { text: 'Design Solutions', path: '/services/design' },
  { text: 'Construction', path: '/services/construction' },
  { text: 'Finance', path: '/services/finance' },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [servicesAnchor, setServicesAnchor] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  // Handlers for mobile and desktop menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleServicesEnter = (event) => {
    setServicesAnchor(event.currentTarget);
  };

  const handleServicesLeave = () => {
    setServicesAnchor(null);
  };

  const handleNavItemClick = (page) => {
    handleCloseNavMenu();
    navigate(page === 'Home' ? '/' : `/${page.toLowerCase()}`);
  };

  const open = Boolean(servicesAnchor);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme.palette.primary.main,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo and Company Name - Adjusted positioning */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml:1 }}>
            <Logo />
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                color: 'white',
                fontSize: { md: '1.1rem', lg: '2rem' },
              }}
            >
             The Next Innovation Reality
            </Typography>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {anchorElNav ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  width: '100%',
                  maxWidth: '100%',
                  marginTop: '10px',
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => handleNavItemClick(page)}
                  sx={{ justifyContent: 'left' }}
                >
                  <Typography textAlign="left">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Company Name - Minimal display */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              color: 'white',
              fontSize: '0.9rem',
              ml:1,
            }}
          >
            Next Innovation Reality
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              gap: 1,
            }}
          >
            {pages.map((page) => {
              if (page === 'Services') {
                return (
                  <Box
                    key={page}
                    onMouseEnter={handleServicesEnter}
                    onMouseLeave={handleServicesLeave}
                    sx={{ position: 'relative' }}
                  >
                    <Button
                      sx={{
                        color: 'white',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                      }}
                    >
                      {page} <ArrowDropDownIcon />
                    </Button>
                    <Popper
                      open={open}
                      anchorEl={servicesAnchor}
                      placement="bottom-start"
                      transition
                    >
                      {({ TransitionProps }) => (
                        <Grow {...TransitionProps}>
                          <Paper
                            sx={{
                              bgcolor: 'primary.dark',
                              color: 'white',
                              mt: 1,
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            }}
                          >
                            <ClickAwayListener onClickAway={handleServicesLeave}>
                              <MenuList>
                                {serviceItems.map((item) => (
                                  <MenuItem
                                    key={item.text}
                                    onClick={() => {
                                      navigate(item.path);
                                      handleServicesLeave();
                                    }}
                                    sx={{
                                      '&:hover': {
                                        bgcolor: 'primary.main',
                                      },
                                    }}
                                  >
                                    {item.text}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </Box>
                );
              }
              return (
                <Button
                  key={page}
                  onClick={() => handleNavItemClick(page)}
                  sx={{
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  {page}
                </Button>
              );
            })}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="View Profile">
              <IconButton
                onClick={() => navigate('/dashboard')}
                sx={{
                  p: 0,
                  '&:hover': { transform: 'scale(1.1)' },
                }}
              >
                <Avatar
                  alt="User"
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    width: 40,
                    height: 40,
                    border: '2px solid white',
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;