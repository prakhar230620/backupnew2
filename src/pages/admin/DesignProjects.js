import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Button, Grid, Card, CardContent,
  TextField, Select, MenuItem, FormControl, InputLabel,
  IconButton, ImageList, ImageListItem, Dialog,
  DialogTitle, DialogContent, DialogActions, Divider, Chip,
  CircularProgress
} from '@mui/material';
import { Add, Edit, Delete, Upload } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useSnackbar } from 'notistack';

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
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811'
    ],
    designs: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6'
    ],
    features: [
      'Italian Marble Flooring',
      'Infinity Pool',
      'Home Automation',
      'Private Garden',
      '5 Bedrooms + Staff Quarter',
      'Home Theater',
      'Elevator'
    ],
    amenities: [
      'Club House',
      'Tennis Court',
      'Jogging Track',
      '24x7 Security'
    ],
    specifications: {
      structure: 'RCC Framed Structure',
      walls: 'AAC Blocks',
      flooring: 'Italian Marble',
      doors: 'Teak Wood Frame',
      windows: 'UPVC Windows',
      kitchen: 'Modular Kitchen with Chimney'
    }
  },
  {
    _id: '2',
    title: 'Green Valley Township',
    category: 'township',
    location: 'Pune-Mumbai Highway',
    description: 'Modern township design spread across 100 acres with sustainable features and smart city infrastructure.',
    area: '100 acres',
    price: '₹2.5 Cr onwards',
    pricePerSqFt: '₹7,500/sq ft',
    status: 'Under Construction',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'
    ],
    designs: [
      'https://images.unsplash.com/photo-1626178793926-22b28830aa30',
      'https://images.unsplash.com/photo-1626178793926-22b28830aa30'
    ],
    features: [
      '2000+ Apartments',
      'Commercial Complex',
      'School & Hospital',
      'Sports Complex',
      'Central Park'
    ],
    amenities: [
      'Metro Connectivity',
      'Shopping Mall',
      'International School',
      'Multi-specialty Hospital'
    ],
    specifications: {
      plotSizes: '1000-5000 sq ft',
      roadWidth: '30-60 ft',
      waterSupply: '24x7',
      electricity: 'Underground Cabling'
    }
  },
  {
    _id: '3',
    title: 'Tech Hub Commercial Center',
    category: 'commercial',
    location: 'Hinjewadi, Pune',
    description: 'State-of-the-art IT park design with modern office spaces and recreational facilities.',
    area: '50,000 sq ft',
    price: '₹75 Cr',
    pricePerSqFt: '₹15,000/sq ft',
    status: 'Ready to Move',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'
    ],
    designs: [
      'https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f',
      'https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f'
    ],
    features: [
      'Grade A Office Space',
      'Double Height Lobby',
      'High-speed Elevators',
      'Ample Parking',
      'Food Court'
    ],
    amenities: [
      'Conference Center',
      'Gym & Recreation Area',
      'Banking & ATM',
      'Electric Vehicle Charging'
    ],
    specifications: {
      floorPlate: '10,000 sq ft',
      ceilingHeight: '3.6 meters',
      airConditioning: 'Central AC',
      powerBackup: '100%'
    }
  },
  {
    _id: '4',
    title: 'Riverside Apartments',
    category: 'residential',
    location: 'Kalyaninagar, Pune',
    description: 'Premium apartment complex with river views and luxury amenities.',
    area: '2,000-4,000 sq ft',
    price: '₹1.8 Cr onwards',
    pricePerSqFt: '₹9,000/sq ft',
    status: 'Under Construction',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'
    ],
    designs: [
      'https://images.unsplash.com/photo-1626178793926-22b28830aa30',
      'https://images.unsplash.com/photo-1626178793926-22b28830aa30'
    ],
    features: [
      '2, 3 & 4 BHK Options',
      'River Facing Balconies',
      'Club House',
      'Swimming Pool',
      'Landscaped Gardens'
    ],
    amenities: [
      'Yoga Center',
      'Kids Play Area',
      'Indoor Games',
      'Party Hall'
    ],
    specifications: {
      structure: 'Earthquake Resistant',
      walls: 'Sound Proof',
      flooring: 'Vitrified Tiles',
      security: 'Multi-tier Security'
    }
  }
];

const DesignProjects = () => {
  // Add states
  const [projects, setProjects] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
    area: '',
    status: '',
    images: [],
    designs: [],
    features: []
  });

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Instead of API call, use dummy data
      setProjects(dummyProjects);
      setLoading(false);
    } catch (error) {
      console.error('Error loading projects:', error);
      enqueueSnackbar('Failed to load projects', { variant: 'error' });
      setLoading(false);
    }
  };

  // File upload handlers
  const { getRootProps: getImageProps, getInputProps: getImageInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...acceptedFiles]
      }));
    }
  });

  const { getRootProps: getDesignProps, getInputProps: getDesignInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFormData(prev => ({
        ...prev,
        designs: [...prev.designs, ...acceptedFiles]
      }));
    }
  });

  // Form handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach(file => {
            formDataToSend.append(key, file);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const url = editingProject 
        ? `/api/design/projects/${editingProject._id}`
        : '/api/design/projects';
      
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend
      });

      if (!response.ok) throw new Error('Failed to save project');

      enqueueSnackbar(
        `Project ${editingProject ? 'updated' : 'created'} successfully!`,
        { variant: 'success' }
      );
      
      setDialogOpen(false);
      setEditingProject(null);
      setFormData({
        title: '',
        category: '',
        location: '',
        description: '',
        area: '',
        status: '',
        images: [],
        designs: [],
        features: []
      });
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  // Add these functions
  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      location: project.location,
      description: project.description,
      area: project.area,
      price: project.price,
      pricePerSqFt: project.pricePerSqFt,
      status: project.status,
      images: project.images,
      designs: project.designs,
      features: project.features,
      amenities: project.amenities,
      specifications: project.specifications
    });
    setDialogOpen(true);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/design/projects/${projectId}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Failed to delete project');
        }

        enqueueSnackbar('Project deleted successfully', { variant: 'success' });
        fetchProjects(); // Refresh the list
      } catch (error) {
        console.error('Error deleting project:', error);
        enqueueSnackbar(error.message || 'Failed to delete project', { variant: 'error' });
      }
    }
  };

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Design Projects Management
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setDialogOpen(true)}
          sx={{ mb: 4 }}
        >
          Add New Design Project
        </Button>

        {/* Projects Grid */}
        <Grid container spacing={3}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 3 }}>
              <CircularProgress />
            </Box>
          ) : projects.length === 0 ? (
            <Box sx={{ textAlign: 'center', width: '100%', mt: 3 }}>
              <Typography variant="h6" color="text.secondary">
                No projects found
              </Typography>
            </Box>
          ) : (
            projects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project._id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {project.location}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="primary">
                        Area: {project.area}
                      </Typography>
                      <Typography variant="subtitle2" color="secondary">
                        Price: {project.price}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {project.pricePerSqFt}
                      </Typography>
                    </Box>
                    <Typography variant="body2" paragraph>
                      {project.description}
                    </Typography>
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
                    {/* Action buttons */}
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <IconButton onClick={() => handleEdit(project)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(project._id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Add/Edit Project Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setEditingProject(null);
            setFormData({
              title: '',
              category: '',
              location: '',
              description: '',
              area: '',
              status: '',
              images: [],
              designs: [],
              features: []
            });
          }}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                {/* Form fields */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Project Title"
                    name="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </Grid>
                {/* Add other form fields */}
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              {editingProject ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default DesignProjects; 