import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editDialog, setEditDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/api/admin/properties');
      setProperties(response.data);
    } catch (error) {
      enqueueSnackbar('Error fetching properties', { variant: 'error' });
    }
  };

  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setEditDialog(true);
  };

  const handleViewProperty = (property) => {
    setSelectedProperty(property);
    setViewDialog(true);
  };

  const handleUpdateProperty = async () => {
    try {
      await axios.put(`/api/admin/properties/${selectedProperty.property_id}`, selectedProperty);
      setEditDialog(false);
      fetchProperties();
      enqueueSnackbar('Property updated successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error updating property', { variant: 'error' });
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`/api/admin/properties/${propertyId}`);
        fetchProperties();
        enqueueSnackbar('Property deleted successfully', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar('Error deleting property', { variant: 'error' });
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Property Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((property) => (
                <TableRow key={property.property_id}>
                  <TableCell>{property.property_id}</TableCell>
                  <TableCell>{property.title}</TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>${property.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={property.status}
                      color={property.status === 'active' ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewProperty(property)}>
                      <ViewIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEditProperty(property)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteProperty(property.property_id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={properties.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog 
        open={editDialog} 
        onClose={() => setEditDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Property</DialogTitle>
        <DialogContent>
          {selectedProperty && (
            <Grid container spacing={2} sx={{ pt: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Title"
                  value={selectedProperty.title}
                  onChange={(e) =>
                    setSelectedProperty({ ...selectedProperty, title: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Type"
                  value={selectedProperty.type}
                  onChange={(e) =>
                    setSelectedProperty({ ...selectedProperty, type: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  value={selectedProperty.location}
                  onChange={(e) =>
                    setSelectedProperty({ ...selectedProperty, location: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={selectedProperty.price}
                  onChange={(e) =>
                    setSelectedProperty({ ...selectedProperty, price: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Status"
                  value={selectedProperty.status}
                  onChange={(e) =>
                    setSelectedProperty({ ...selectedProperty, status: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateProperty} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog 
        open={viewDialog} 
        onClose={() => setViewDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Property Details</DialogTitle>
        <DialogContent>
          {selectedProperty && (
            <Grid container spacing={2} sx={{ pt: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h6">{selectedProperty.title}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Type:</strong> {selectedProperty.type}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Price:</strong> ${selectedProperty.price.toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Location:</strong> {selectedProperty.location}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Description:</strong></Typography>
                <Typography>{selectedProperty.description}</Typography>
              </Grid>
              {selectedProperty.features && (
                <Grid item xs={12}>
                  <Typography><strong>Features:</strong></Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedProperty.features.map((feature, index) => (
                      <Chip key={index} label={feature} />
                    ))}
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PropertyManagement; 