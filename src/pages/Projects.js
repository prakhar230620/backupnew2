import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Typography, Box, Card, CardContent, Button,
  CardMedia, Chip, Divider, Dialog, DialogTitle, DialogContent,
  DialogActions, IconButton, ImageList, ImageListItem, List,
  ListItem, ListItemIcon, ListItemText, Tabs, Tab
} from '@mui/material';
import {
  LocationOn,
  Business,
  Timer,
  Category,
  AttachMoney,
  Apartment,
  Close as CloseIcon,
  CalendarToday,
  Square,
  Engineering
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Project Categories
const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'township', label: 'Township' },
  { id: 'upcoming', label: 'Upcoming' }
];

// Dummy Projects Data
const dummyProjects = [
  {
    _id: '1',
    title: 'NIR Smart City',
    category: 'township',
    status: 'Upcoming',
    location: 'Pune-Mumbai Highway',
    description: 'A smart city project spread across 200 acres featuring residential towers, commercial spaces, and world-class amenities.',
    launchDate: 'June 2024',
    completionDate: 'December 2028',
    totalArea: '200 acres',
    totalUnits: '5000+',
    priceRange: '₹45L - ₹2.5Cr',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'
    ],
    masterPlan: [
      'https://images.unsplash.com/photo-1626178793926-22b28830aa30'
    ],
    features: [
      'Smart Infrastructure',
      'Metro Connectivity',
      'International School',
      'Shopping Mall',
      'Sports Complex',
      'Medical Facilities'
    ],
    specifications: {
      plotSizes: '1000-5000 sq ft',
      towers: '25+',
      greenArea: '40%',
      parking: 'Multi-level'
    },
    amenities: [
      'Club House',
      'Swimming Pool',
      'Tennis Court',
      'Jogging Track',
      'Kids Play Area',
      'Gym'
    ],
    highlights: [
      'Smart City Infrastructure',
      'Sustainable Design',
      'Premium Location',
      'Modern Amenities'
    ]
  },
  {
    _id: '2',
    title: 'NIR Business Hub',
    category: 'commercial',
    status: 'Under Construction',
    location: 'Baner, Pune',
    description: 'Premium commercial complex with modern office spaces, retail outlets, and entertainment zones.',
    launchDate: 'March 2024',
    completionDate: 'September 2026',
    totalArea: '15 acres',
    totalUnits: '500+',
    priceRange: '₹75L - ₹5Cr',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'
    ],
    masterPlan: [
      'https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f'
    ],
    features: [
      'Grade A Office Spaces',
      'High-speed Elevators',
      'Food Court',
      'Conference Center',
      'Retail Spaces',
      '24/7 Security'
    ],
    specifications: {
      officeSize: '500-5000 sq ft',
      floorPlate: '20,000 sq ft',
      ceilingHeight: '3.6m',
      powerBackup: '100%'
    },
    amenities: [
      'Business Center',
      'Meeting Rooms',
      'Cafeteria',
      'Parking',
      'ATM',
      'EV Charging'
    ],
    highlights: [
      'Prime Location',
      'Modern Architecture',
      'Green Building',
      'Smart Features'
    ]
  }
  // Add more projects...
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  useEffect(() => {
    const filteredProjects = selectedCategory === 'all'
      ? dummyProjects
      : dummyProjects.filter(project => project.category === selectedCategory);
    setProjects(filteredProjects);
  }, [selectedCategory]);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setDetailsDialogOpen(true);
  };

  // Project Details Dialog Component
  const ProjectDetailsDialog = () => (
    <Dialog
      open={detailsDialogOpen}
      onClose={() => setDetailsDialogOpen(false)}
      maxWidth="lg"
      fullWidth
    >
      {selectedProject && (
        <>
          <DialogTitle>
            {selectedProject.title}
            <IconButton
              onClick={() => setDetailsDialogOpen(false)}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3}>
              {/* Project Images */}
              <Grid item xs={12}>
                <ImageList sx={{ height: 400 }} cols={2} rowHeight={200}>
                  {selectedProject.images.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={image}
                        alt={`View ${index + 1}`}
                        loading="lazy"
                        style={{ height: '100%', objectFit: 'cover' }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>

              {/* Project Overview */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Project Overview
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><LocationOn /></ListItemIcon>
                    <ListItemText primary="Location" secondary={selectedProject.location} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CalendarToday /></ListItemIcon>
                    <ListItemText 
                      primary="Timeline" 
                      secondary={`Launch: ${selectedProject.launchDate} | Completion: ${selectedProject.completionDate}`} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Square /></ListItemIcon>
                    <ListItemText primary="Total Area" secondary={selectedProject.totalArea} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Apartment /></ListItemIcon>
                    <ListItemText primary="Total Units" secondary={selectedProject.totalUnits} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><AttachMoney /></ListItemIcon>
                    <ListItemText primary="Price Range" secondary={selectedProject.priceRange} />
                  </ListItem>
                </List>
              </Grid>

              {/* Project Features */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Key Features
                </Typography>
                <Grid container spacing={1}>
                  {selectedProject.features.map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Engineering sx={{ color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="body2">{feature}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* Master Plan */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Master Plan
                </Typography>
                <ImageList sx={{ height: 300 }} cols={1}>
                  {selectedProject.masterPlan.map((plan, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={plan}
                        alt="Master Plan"
                        loading="lazy"
                        style={{ height: '100%', objectFit: 'contain' }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
            </Grid>
          </DialogContent>
        </>
      )}
    </Dialog>
  );

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 12,
          mb: 8,
          background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)'
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 700 }}>
              Our Projects
            </Typography>
            <Typography variant="h5" align="center" sx={{ opacity: 0.9 }}>
              Discover our latest developments and upcoming projects
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container sx={{ mb: 8 }}>
        {/* Category Tabs */}
        <Tabs
          value={selectedCategory}
          onChange={(_, value) => setSelectedCategory(value)}
          centered
          sx={{ mb: 4 }}
        >
          {projectCategories.map(category => (
            <Tab
              key={category.id}
              value={category.id}
              label={category.label}
            />
          ))}
        </Tabs>

        {/* Projects Grid */}
        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.images[0]}
                    alt={project.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {project.location}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="primary">
                        Total Area: {project.totalArea}
                      </Typography>
                      <Typography variant="subtitle2" color="secondary">
                        Price Range: {project.priceRange}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      <Chip 
                        label={project.category} 
                        size="small" 
                        color="primary"
                      />
                      <Chip 
                        label={project.status} 
                        size="small" 
                        color={project.status === 'Completed' ? 'success' : 'warning'}
                      />
                    </Box>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleViewDetails(project)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Project Details Dialog */}
      <ProjectDetailsDialog />
    </Box>
  );
};

export default Projects; 