import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Typography, Box, Card, CardContent, Button,
  List, ListItem, ListItemIcon, ListItemText, Divider, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, IconButton,
  ImageList, ImageListItem, ImageListItemBar, Tab, Tabs, Chip,
  CardActions
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Brush,
  Architecture,
  Style,
  Apartment,
  CheckCircle,
  Close as CloseIcon,
  Send,
  Timer,
  HomeWork,
  Store,
  LocationOn,
  Category,
  Palette
} from '@mui/icons-material';

// Design Categories
const designCategories = [
  { id: 'all', label: 'All Designs' },
  { id: 'residential', label: 'Residential Interiors' },
  { id: 'commercial', label: 'Commercial Interiors' },
  { id: 'architectural', label: 'Architectural Designs' },
  { id: '3d', label: '3D Visualization' }
];

// Add dummy projects data
const dummyProjects = [
  {
    _id: '1',
    title: 'Luxury Villa Design - The Palm Grove',
    category: 'residential',
    location: 'Lonavala, Maharashtra',
    description: 'Ultra-luxury villa design with Mediterranean architecture, featuring smart home integration and sustainable design elements.',
    area: '8,500 sq ft',
    price: '₹4.5 Cr',
    pricePerSqFt: '₹52,941/sq ft',
    status: 'Completed',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811'
    ],
    designs: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6'
    ]
  },
  // ... other projects
];

// Design Services
const designServices = [
  {
    title: "Interior Design",
    description: "Transform your space with our expert interior design services",
    icon: <Style sx={{ fontSize: 40 }} />,
    features: [
      "Space Planning",
      "Color Consultation",
      "Furniture Selection",
      "Lighting Design",
      "Material Selection"
    ],
    types: ["Residential", "Commercial", "Hospitality"],
    color: "#9c27b0"
  },
  {
    title: "Architectural Design",
    description: "Innovative architectural solutions for your projects",
    icon: <Architecture sx={{ fontSize: 40 }} />,
    features: [
      "Concept Development",
      "3D Visualization",
      "Construction Documents",
      "Site Planning",
      "Sustainable Design"
    ],
    types: ["Buildings", "Interiors", "Landscapes"],
    color: "#2196f3"
  },
  {
    title: "3D Visualization",
    description: "Bring your ideas to life with photorealistic 3D renders",
    icon: <Apartment sx={{ fontSize: 40 }} />,
    features: [
      "Interior Renders",
      "Exterior Renders",
      "Virtual Tours",
      "Animation",
      "VR Experience"
    ],
    types: ["Interiors", "Exteriors", "Products"],
    color: "#4caf50"
  }
];

// ... rest of the component structure similar to Construction.js
// Including ProjectsGallery, ProjectDetailsDialog, and Enquiry form
// But with design-specific fields and validations

const DesignSolutions = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  // Add handleViewDetails function
  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setDetailsDialogOpen(true);
  };

  // Add Project Details Dialog
  const ProjectDetailsDialog = () => (
    <Dialog
      open={detailsDialogOpen}
      onClose={() => setDetailsDialogOpen(false)}
      maxWidth="md"
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

              {/* Project Details */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Project Details
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><LocationOn /></ListItemIcon>
                    <ListItemText 
                      primary="Location"
                      secondary={selectedProject.location}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Category /></ListItemIcon>
                    <ListItemText 
                      primary="Category"
                      secondary={selectedProject.category}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Timer /></ListItemIcon>
                    <ListItemText 
                      primary="Status"
                      secondary={selectedProject.status}
                    />
                  </ListItem>
                </List>
              </Grid>

              {/* Project Specifications */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Specifications
                </Typography>
                <Typography variant="body2" paragraph>
                  Area: {selectedProject.area}
                </Typography>
                <Typography variant="body2" paragraph>
                  Price: {selectedProject.price}
                </Typography>
                <Typography variant="body2">
                  {selectedProject.pricePerSqFt}
                </Typography>
              </Grid>

              {/* Project Description */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedProject.description}
                </Typography>
              </Grid>

              {/* Design Images */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Design Plans
                </Typography>
                <ImageList sx={{ height: 200 }} cols={2}>
                  {selectedProject.designs.map((design, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={design}
                        alt={`Design ${index + 1}`}
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

  useEffect(() => {
    // Filter projects based on selected category
    const filteredProjects = selectedCategory === 'all' 
      ? dummyProjects 
      : dummyProjects.filter(project => project.category === selectedCategory);
    setProjects(filteredProjects);
  }, [selectedCategory]);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 12,
          mb: 8,
          background: 'linear-gradient(45deg, #6a1b9a 30%, #9c27b0 90%)'
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 700 }}>
              Design Solutions
            </Typography>
            <Typography variant="h5" align="center" sx={{ opacity: 0.9 }}>
              Where creativity meets functionality
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container>
        {/* Category Tabs */}
        <Tabs
          value={selectedCategory}
          onChange={(_, value) => setSelectedCategory(value)}
          centered
          sx={{ mb: 4 }}
        >
          {designCategories.map(category => (
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
                  {/* Project Image */}
                  <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>

                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {project.location}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="primary">
                        Area: {project.area}
                      </Typography>
                      <Typography variant="subtitle2" color="secondary">
                        Price: {project.price}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {project.pricePerSqFt}
                      </Typography>
                    </Box>
                    <Typography variant="body2" paragraph>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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
                  </CardContent>

                  <CardActions>
                    <Button size="small" onClick={() => handleViewDetails(project)}>
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Services section and other content */}
      {/* ... */}

      {/* Add ProjectDetailsDialog */}
      <ProjectDetailsDialog />
    </Box>
  );
};

export default DesignSolutions; 