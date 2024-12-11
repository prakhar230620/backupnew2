import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Edit,
  Favorite,
  ListAlt,
  Business,
  Assignment,
  Logout
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }

    // TODO: Fetch user's properties from API
    // fetchUserProperties();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar
                sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                src={user?.profileImage}
              >
                {user?.name?.charAt(0)}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user?.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {user?.user_type?.toUpperCase()}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                sx={{ mt: 2 }}
                onClick={() => navigate('/profile/edit')}
              >
                Edit Profile
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Logout />}
                sx={{ mt: 2, ml: 2 }}
                onClick={logout}
              >
                Logout
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <List>
              <ListItem>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText primary="Email" secondary={user?.email} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText primary="Phone" secondary={user?.mobile || 'Not added'} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOn />
                </ListItemIcon>
                <ListItemText primary="Location" secondary="Add your location" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Main Content Section */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Quick Stats */}
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Properties Listed
                      </Typography>
                      <Typography variant="h5">0</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Saved Properties
                      </Typography>
                      <Typography variant="h5">0</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Reviews
                      </Typography>
                      <Typography variant="h5">0</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Active Listings
                      </Typography>
                      <Typography variant="h5">0</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* Quick Actions */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<Business />}
                      onClick={() => navigate('/list-property')}
                    >
                      List Property
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<Favorite />}
                      onClick={() => navigate('/saved-properties')}
                    >
                      Saved Properties
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ListAlt />}
                      onClick={() => navigate('/my-listings')}
                    >
                      My Listings
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<Assignment />}
                      onClick={() => navigate('/subscriptions')}
                    >
                      Subscriptions
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Recent Activities or Listings */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Activities
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="No recent activities"
                      secondary="Your recent activities will appear here"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 