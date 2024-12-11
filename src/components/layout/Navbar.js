import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
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
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person,
  Dashboard,
  ExpandLess,
  ExpandMore,
  Home,
  Business,
  Construction,
  AccountBox,
  Login,
  Logout,
  Email,
  Add
} from '@mui/icons-material';

// Navigation items configuration
const navigationItems = [
  { title: 'Home', path: '/', icon: <Home /> },
  { 
    title: 'Services',
    icon: <Business />,
    children: [
      { title: 'NIR Smart Packages', path: '/services/smart-packages' },
      { title: 'Brand Promotion', path: '/services/brand-promotion' },
      { title: 'Financial Services', path: '/services/finance' },
      { title: 'Construction Services', path: '/services/construction' },
      { title: 'Design Solutions', path: '/services/design' }
    ]
  },
  { title: 'Projects', path: '/projects', icon: <Construction /> },
  { title: 'About', path: '/about', icon: <AccountBox /> },
  { title: 'Contact', path: '/contact', icon: <Email /> }
];

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [user, setUser] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
  const isServicesMenuOpen = Boolean(servicesAnchorEl);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleServicesMenuOpen = (event) => {
    setServicesAnchorEl(event.currentTarget);
  };

  const handleServicesMenuClose = () => {
    setServicesAnchorEl(null);
  };

  const renderNavLinks = () => (
    <>
      <Button
        component={RouterLink}
        to="/"
        sx={{ color: 'white', display: 'block' }}
        className={location.pathname === '/' ? 'active' : ''}
      >
        Home
      </Button>

      {/* Services Dropdown */}
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Button
          onClick={handleServicesMenuOpen}
          sx={{
            color: 'white',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Services
          {isServicesMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </Button>
        <Menu
          anchorEl={servicesAnchorEl}
          open={isServicesMenuOpen}
          onClose={handleServicesMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{
            '& .MuiPaper-root': {
              mt: 1,
              minWidth: 200,
              boxShadow: 3
            }
          }}
        >
          {navigationItems.find(item => item.title === 'Services').children.map((item) => (
            <MenuItem
              key={item.path}
              component={RouterLink}
              to={item.path}
              onClick={handleServicesMenuClose}
              sx={{
                py: 1,
                '&:hover': {
                  bgcolor: 'primary.light',
                  color: 'white'
                }
              }}
            >
              <Typography variant="body1">{item.title}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Other nav links */}
      <Button
        component={RouterLink}
        to="/projects"
        sx={{ color: 'white', display: 'block' }}
        className={location.pathname === '/projects' ? 'active' : ''}
      >
        Projects
      </Button>
      <Button
        component={RouterLink}
        to="/about"
        sx={{ color: 'white', display: 'block' }}
        className={location.pathname === '/about' ? 'active' : ''}
      >
        About
      </Button>
      <Button
        component={RouterLink}
        to="/contact"
        sx={{ color: 'white', display: 'block' }}
        className={location.pathname === '/contact' ? 'active' : ''}
      >
        Contact
      </Button>
    </>
  );

  const renderMobileMenu = () => (
    <Drawer
      anchor="left"
      open={mobileDrawerOpen}
      onClose={handleDrawerToggle}
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          bgcolor: 'primary.main',
          color: 'white'
        }
      }}
    >
      <List>
        <ListItem button component={RouterLink} to="/" onClick={handleDrawerToggle}>
          <ListItemIcon sx={{ color: 'white' }}>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        {/* Services Dropdown in Mobile */}
        <ListItem button onClick={() => setServicesOpen(!servicesOpen)}>
          <ListItemIcon sx={{ color: 'white' }}>
            <Business />
          </ListItemIcon>
          <ListItemText primary="Services" />
          {servicesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={servicesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {navigationItems.find(item => item.title === 'Services').children.map((item) => (
              <ListItem
                key={item.path}
                button
                component={RouterLink}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{ pl: 4 }}
              >
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Other mobile menu items */}
        <ListItem button component={RouterLink} to="/projects" onClick={handleDrawerToggle}>
          <ListItemIcon sx={{ color: 'white' }}>
            <Construction />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
        <ListItem button component={RouterLink} to="/about" onClick={handleDrawerToggle}>
          <ListItemIcon sx={{ color: 'white' }}>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={RouterLink} to="/contact" onClick={handleDrawerToggle}>
          <ListItemIcon sx={{ color: 'white' }}>
            <Email />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            THE NEXT INNOVATION REALTY
          </Typography>

          {/* Mobile Menu */}
          {isMobile && (
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {renderNavLinks()}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.name} src={user.profileImage} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem component={RouterLink} to="/profile">
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  {user.user_type === 'admin' && (
                    <MenuItem component={RouterLink} to="/admin/dashboard">
                      <ListItemIcon>
                        <Dashboard fontSize="small" />
                      </ListItemIcon>
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                color="inherit"
                startIcon={<Login />}
              >
                Login
              </Button>
            )}
          </Box>

          {/* Add List Property Button */}
          <Button
            component={RouterLink}
            to="/list-property"
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            sx={{ ml: 2 }}
          >
            List Property
          </Button>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      {renderMobileMenu()}
    </AppBar>
  );
};

export default Navbar; 