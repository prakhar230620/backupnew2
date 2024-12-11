import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleServicesEnter = (event) => {
    setServicesAnchorEl(event.currentTarget);
  };

  const handleServicesLeave = () => {
    setServicesAnchorEl(null);
  };

  const handleServicesClose = (event) => {
    if (servicesAnchorEl && servicesAnchorEl.contains(event.target)) {
      return;
    }
    setServicesAnchorEl(null);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Projects', path: '/projects' },
    { text: 'About', path: '/about' },
    { text: 'Contact', path: '/contact' }
  ];

  const serviceItems = [
    { text: 'NIR Smart Packages', path: '/services/smart-packages' },
    { text: 'Brand Promotion', path: '/services/brand-promotion' },
    { text: 'Design Solutions', path: '/services/design' },
    { text: 'Construction', path: '/services/construction' },
  ];

  const servicesOpen = Boolean(servicesAnchorEl);

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'primary.dark',
        color: 'white'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Logo />

        {isMobile ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', gap: 0 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  color: 'white',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0',
                    height: '2px',
                    bottom: '0',
                    left: '50%',
                    backgroundColor: 'white',
                    transition: 'all 0.3s ease-in-out',
                    transform: 'translateX(-50%)',
                  },
                  '&:hover::after': {
                    width: '100%',
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                  }
                }}
              >
                {item.text}
              </Button>
            ))}
            <Box
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <Button
                endIcon={<ArrowDropDownIcon />}
                sx={{
                  color: 'white',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0',
                    height: '2px',
                    bottom: '0',
                    left: '50%',
                    backgroundColor: 'white',
                    transition: 'all 0.3s ease-in-out',
                    transform: 'translateX(-50%)',
                  },
                  '&:hover::after': {
                    width: '100%',
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                  }
                }}
              >
                Services
              </Button>
              <Popper
                open={servicesOpen}
                anchorEl={servicesAnchorEl}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Paper sx={{ bgcolor: 'primary.dark', color: 'white' }}>
                      <ClickAwayListener onClickAway={handleServicesClose}>
                        <MenuList autoFocusItem={servicesOpen}>
                          {serviceItems.map((item) => (
                            <MenuItem
                              key={item.text}
                              component={Link}
                              to={item.path}
                              onClick={handleServicesClose}
                              sx={{
                                '&:hover': {
                                  bgcolor: 'primary.main',
                                }
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
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                ml: 2,
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Login
            </Button>
          </Box>
        )}

        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          PaperProps={{
            sx: {
              bgcolor: 'primary.dark',
              color: 'white',
            }
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <List>
              {menuItems.map((item) => (
                <ListItem
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'primary.main',
                    }
                  }}
                >
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
              <ListItem
                button
                onClick={(event) => setServicesAnchorEl(event.currentTarget)}
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'primary.main',
                  }
                }}
              >
                <ListItemText primary="Services" />
                <ArrowDropDownIcon />
              </ListItem>
              {servicesOpen && (
                <List component="div" disablePadding>
                  {serviceItems.map((item) => (
                    <ListItem
                      key={item.text}
                      component={Link}
                      to={item.path}
                      onClick={handleServicesClose}
                      sx={{
                        pl: 4,
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'primary.light',
                        }
                      }}
                    >
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                </List>
              )}
              <ListItem
                component={Link}
                to="/login"
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'primary.main',
                  }
                }}
              >
                <ListItemText primary="Login" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

