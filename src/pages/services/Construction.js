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
  Engineering,
  Architecture,
  Build,
  Assignment,
  CheckCircle,
  Close as CloseIcon,
  Send,
  Timer,
  Apartment,
  HomeWork,
  Villa,
  Store,
  LocationOn,
  Category
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

// Construction Services Data
const services = [
  {
    title: "Residential Construction",
    description: "Build your dream home with our expert construction services",
    icon: <HomeWork sx={{ fontSize: 40 }} />,
    features: [
      "Custom Home Design",
      "Quality Materials",
      "Expert Team",
      "Timely Completion",
      "Cost-Effective Solutions"
    ],
    types: ["Individual Houses", "Villas", "Apartments"],
    color: "#2196f3"
  },
  {
    title: "Commercial Construction",
    description: "Professional construction services for your business needs",
    icon: <Store sx={{ fontSize: 40 }} />,
    features: [
      "Modern Designs",
      "Space Optimization",
      "Safety Standards",
      "Project Management",
      "Regulatory Compliance"
    ],
    types: ["Office Spaces", "Retail Shops", "Warehouses"],
    color: "#4caf50"
  },
  {
    title: "Renovation Services",
    description: "Transform your existing property with our renovation expertise",
    icon: <Build sx={{ fontSize: 40 }} />,
    features: [
      "Modern Upgrades",
      "Structural Repairs",
      "Interior Renovation",
      "Exterior Makeover",
      "Energy Efficiency"
    ],
    types: ["Home Renovation", "Office Renovation", "Shop Renovation"],
    color: "#ff9800"
  }
];

// Construction Process Steps
const constructionSteps = [
  {
    title: "Planning & Design",
    description: "Detailed architectural planning and design development",
    icon: <Architecture />,
    duration: "2-4 weeks"
  },
  {
    title: "Approvals & Permits",
    description: "Obtaining necessary permissions and regulatory approvals",
    icon: <Assignment />,
    duration: "4-6 weeks"
  },
  {
    title: "Construction Phase",
    description: "Actual construction work with quality materials",
    icon: <Build />,
    duration: "Variable"
  },
  {
    title: "Quality Inspection",
    description: "Regular quality checks and progress monitoring",
    icon: <CheckCircle />,
    duration: "Ongoing"
  }
];

// Validation Schema for Enquiry Form
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid phone number')
    .required('Phone number is required'),
  projectType: Yup.string().required('Project type is required'),
  location: Yup.string().required('Location is required'),
  budget: Yup.string().required('Budget range is required'),
  requirements: Yup.string()
});

// Add new project categories
const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'industrial', label: 'Industrial' }
];

const dummyProjects = [
  {
    _id: '1',
    title: 'Luxury Villa Complex',
    category: 'residential',
    location: 'Juhu, Mumbai',
    description: 'A premium residential complex featuring 12 luxury villas with modern amenities including swimming pools, smart home automation, and landscaped gardens.',
    status: 'Completed',
    duration: '18 months',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4'
    ],
    designs: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6'
    ]
  },
  {
    _id: '2',
    title: 'Tech Park',
    category: 'commercial',
    location: 'Whitefield, Bangalore',
    description: 'State-of-the-art commercial complex with modern office spaces, conference facilities, and recreational areas spread across 5 acres.',
    status: 'In Progress',
    duration: '24 months',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
      'https://images.unsplash.com/photo-1497366216548-37526070297c'
    ],
    designs: [
      'https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f',
      'https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f'
    ]
  },
  {
    _id: '3',
    title: 'Grand Hotel & Resort',
    category: 'hospitality',
    location: 'Goa',
    description: 'Five-star beachfront resort featuring 200 rooms, multiple restaurants, spa facilities, and conference centers.',
    status: 'Completed',
    duration: '30 months',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945'
    ],
    designs: [
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e'
    ]
  },
  {
    _id: '4',
    title: 'Industrial Complex',
    category: 'industrial',
    location: 'Pune',
    description: 'Modern industrial facility with warehouses, manufacturing units, and office spaces built with sustainable materials.',
    status: 'Completed',
    duration: '12 months',
    images: [
      'https://images.unsplash.com/photo-1553522911-d46a837d4979',
      'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801',
      'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801'
    ],
    designs: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f'
    ]
  },
  {
    _id: '5',
    title: 'Green Valley Apartments',
    category: 'residential',
    location: 'Pune',
    description: 'Eco-friendly residential complex with solar power, rainwater harvesting, and organic gardens.',
    status: 'In Progress',
    duration: '24 months',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'
    ],
    designs: [
      'https://images.unsplash.com/photo-1626178793926-22b28830aa30',
      'https://images.unsplash.com/photo-1626178793926-22b28830aa30'
    ]
  }
];

const Construction = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory]);

  const fetchProjects = async () => {
    try {
      // For now, use dummy data instead of API call
      const filteredProjects = selectedCategory === 'all' 
        ? dummyProjects 
        : dummyProjects.filter(project => project.category === selectedCategory);
      
      setProjects(filteredProjects);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      projectType: '',
      location: '',
      budget: '',
      requirements: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Send to backend
        const response = await fetch('/api/construction/enquiry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

        if (!response.ok) throw new Error('Failed to submit enquiry');

        enqueueSnackbar('Enquiry submitted successfully!', { variant: 'success' });
        setDialogOpen(false);
        formik.resetForm();
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  });

  // Add Projects Gallery Section
  const ProjectsGallery = () => (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Our Projects
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Explore our latest construction projects
      </Typography>

      {/* Category Tabs */}
      <Tabs
        value={selectedCategory}
        onChange={(_, newValue) => setSelectedCategory(newValue)}
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
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <ImageList sx={{ height: 300 }} cols={1}>
                  {project.images.slice(0, 1).map((image) => (
                    <ImageListItem key={image}>
                      <img
                        src={image}
                        alt={project.title}
                        loading="lazy"
                        style={{ height: '100%', objectFit: 'cover' }}
                      />
                      <ImageListItemBar
                        title={project.title}
                        subtitle={project.location}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip label={project.category} color="primary" size="small" />
                    <Chip label={project.status} color="secondary" size="small" />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    onClick={() => handleProjectClick(project)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  // Project Details Dialog
  const [selectedProject, setSelectedProject] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setDetailsOpen(true);
  };

  const ProjectDetailsDialog = () => (
    <Dialog
      open={detailsOpen}
      onClose={() => setDetailsOpen(false)}
      maxWidth="md"
      fullWidth
    >
      {selectedProject && (
        <>
          <DialogTitle>
            {selectedProject.title}
            <IconButton
              onClick={() => setDetailsOpen(false)}
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
                        alt={`Project view ${index + 1}`}
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
                      primary="Duration"
                      secondary={selectedProject.duration}
                    />
                  </ListItem>
                </List>
              </Grid>

              {/* Project Description */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedProject.description}
                </Typography>
              </Grid>

              {/* Project Plans/Designs */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Plans & Designs
                </Typography>
                <ImageList sx={{ height: 200 }} cols={3}>
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
              Construction Services
            </Typography>
            <Typography variant="h5" align="center" sx={{ opacity: 0.9 }}>
              Building your dreams with excellence and innovation
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container sx={{ mb: 8 }}>
        {/* Services Section */}
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: service.color }}>
                      {service.icon}
                      <Typography variant="h5" sx={{ ml: 1 }}>
                        {service.title}
                      </Typography>
                    </Box>
                    <Typography paragraph color="text.secondary">
                      {service.description}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Features:
                    </Typography>
                    <List dense>
                      {service.features.map((feature, i) => (
                        <ListItem key={i}>
                          <ListItemIcon>
                            <CheckCircle sx={{ color: service.color }} />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Types:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {service.types.map((type, i) => (
                        <Typography
                          key={i}
                          variant="body2"
                          sx={{
                            bgcolor: `${service.color}20`,
                            color: service.color,
                            px: 1,
                            py: 0.5,
                            borderRadius: 1
                          }}
                        >
                          {type}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Construction Process Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Our Construction Process
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            A systematic approach to bring your vision to life
          </Typography>

          <Grid container spacing={4}>
            {constructionSteps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      position: 'relative'
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 16px'
                        }}
                      >
                        {step.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {step.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Timer sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {step.duration}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => setDialogOpen(true)}
            startIcon={<Send />}
          >
            Start Your Project
          </Button>
        </Box>
      </Container>

      {/* Add Projects Gallery */}
      <ProjectsGallery />
      
      {/* Add Project Details Dialog */}
      <ProjectDetailsDialog />

      {/* Enquiry Form Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Construction Project Enquiry
          <IconButton
            onClick={() => setDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Project Type"
                  name="projectType"
                  value={formik.values.projectType}
                  onChange={formik.handleChange}
                  error={formik.touched.projectType && Boolean(formik.errors.projectType)}
                  helperText={formik.touched.projectType && formik.errors.projectType}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Budget Range"
                  name="budget"
                  value={formik.values.budget}
                  onChange={formik.handleChange}
                  error={formik.touched.budget && Boolean(formik.errors.budget)}
                  helperText={formik.touched.budget && formik.errors.budget}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Requirements"
                  name="requirements"
                  multiline
                  rows={4}
                  value={formik.values.requirements}
                  onChange={formik.handleChange}
                  error={formik.touched.requirements && Boolean(formik.errors.requirements)}
                  helperText={formik.touched.requirements && formik.errors.requirements}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
          >
            Submit Enquiry
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Construction; 