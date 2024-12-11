import React, { useState } from 'react';
import {
  Container, Grid, Typography, Box, Card, CardContent, Button,
  TextField, IconButton, CircularProgress, Alert, Paper,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Upload, VideoLibrary, Close } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const ProductListing = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    location: '',
    contactNumber: '',
    images: [],
    video: null
  });

  // Categories for products
  const categories = [
    'Residential Property',
    'Commercial Property',
    'Plot/Land',
    'Rental Property',
    'Investment Property'
  ];

  // Image Upload Handler
  const { getRootProps: getImageProps, getInputProps: getImageInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 2,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.length > 2) {
        enqueueSnackbar('Maximum 2 images allowed', { variant: 'warning' });
        return;
      }
      setFormData(prev => ({
        ...prev,
        images: acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
      }));
    }
  });

  // Video Upload Handler
  const { getRootProps: getVideoProps, getInputProps: getVideoInputProps } = useDropzone({
    accept: 'video/*',
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB max
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.[0]) {
        setFormData(prev => ({
          ...prev,
          video: Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0])
          })
        }));
      }
    }
  });

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append text data
      Object.keys(formData).forEach(key => {
        if (key !== 'images' && key !== 'video') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append images
      formData.images.forEach((image, index) => {
        formDataToSend.append(`image${index + 1}`, image);
      });

      // Append video
      if (formData.video) {
        formDataToSend.append('video', formData.video);
      }

      const response = await fetch('/api/products/list', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to list product');

      enqueueSnackbar('Product listed successfully!', { variant: 'success' });
      navigate('/profile'); // Redirect to profile page
    } catch (error) {
      console.error('Error listing product:', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          List Your Property
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Showcase your property with images and video to reach potential buyers
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Basic Details */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Property Title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Price and Location */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                required
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </Grid>

            {/* Contact Details */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Number"
                required
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                required
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>

            {/* Image Upload */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Upload Images (Max 2)
              </Typography>
              <Box
                {...getImageProps()}
                sx={{
                  border: '2px dashed',
                  borderColor: 'primary.main',
                  borderRadius: 1,
                  p: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  mb: 2
                }}
              >
                <input {...getImageInputProps()} />
                <Upload color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography>Drag & drop or click to select images</Typography>
              </Box>
              {formData.images.length > 0 && (
                <Grid container spacing={1}>
                  {formData.images.map((file, index) => (
                    <Grid item key={index}>
                      <Box sx={{ position: 'relative' }}>
                        <img
                          src={file.preview}
                          alt={`Preview ${index + 1}`}
                          style={{ width: 100, height: 100, objectFit: 'cover' }}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: -10,
                            right: -10,
                            bgcolor: 'background.paper'
                          }}
                          onClick={() => {
                            const newImages = formData.images.filter((_, i) => i !== index);
                            setFormData({ ...formData, images: newImages });
                          }}
                        >
                          <Close />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>

            {/* Video Upload */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Upload Video (Max 30 seconds, 50MB)
              </Typography>
              <Box
                {...getVideoProps()}
                sx={{
                  border: '2px dashed',
                  borderColor: 'primary.main',
                  borderRadius: 1,
                  p: 2,
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                <input {...getVideoInputProps()} />
                <VideoLibrary color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography>Drag & drop or click to select video</Typography>
              </Box>
              {formData.video && (
                <Box sx={{ mt: 2, position: 'relative' }}>
                  <video
                    src={formData.video.preview}
                    style={{ maxWidth: '100%', maxHeight: 200 }}
                    controls
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      bgcolor: 'background.paper'
                    }}
                    onClick={() => setFormData({ ...formData, video: null })}
                  >
                    <Close />
                  </IconButton>
                </Box>
              )}
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'List Property'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ProductListing; 