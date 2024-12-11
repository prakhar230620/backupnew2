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
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ImageList,
  ImageListItem
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const ConstructionProjects = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editDialog, setEditDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const projectCategories = [
    'Residential',
    'Commercial',
    'Industrial',
    'Infrastructure'
  ];

  const projectStatuses = [
    'Planning',
    'In Progress',
    'Completed',
    'On Hold'
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/admin/construction-projects');
      setProjects(response.data);
    } catch (error) {
      enqueueSnackbar('Error fetching projects', { variant: 'error' });
    }
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('/api/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadedFiles(prev => [...prev, ...response.data.files]);
    } catch (error) {
      enqueueSnackbar('Error uploading files', { variant: 'error' });
    }
  };

  const handleCreateProject = async () => {
    try {
      const projectData = {
        ...selectedProject,
        media: uploadedFiles
      };
      await axios.post('/api/admin/construction-projects', projectData);
      setCreateDialog(false);
      setSelectedProject(null);
      setUploadedFiles([]);
      fetchProjects();
      enqueueSnackbar('Project created successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error creating project', { variant: 'error' });
    }
  };

  const handleUpdateProject = async () => {
    try {
      const projectData = {
        ...selectedProject,
        media: uploadedFiles
      };
      await axios.put(`/api/admin/construction-projects/${selectedProject.project_id}`, projectData);
      setEditDialog(false);
      fetchProjects();
      enqueueSnackbar('Project updated successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error updating project', { variant: 'error' });
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/api/admin/construction-projects/${projectId}`);
        fetchProjects();
        enqueueSnackbar('Project deleted successfully', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar('Error deleting project', { variant: 'error' });
      }
    }
  };

  const ProjectForm = ({ mode }) => (
    <Grid container spacing={2} sx={{ pt: 2 }}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Title"
          value={selectedProject?.title || ''}
          onChange={(e) =>
            setSelectedProject(prev => ({ ...prev, title: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedProject?.category || ''}
            label="Category"
            onChange={(e) =>
              setSelectedProject(prev => ({ ...prev, category: e.target.value }))
            }
          >
            {projectCategories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={selectedProject?.description || ''}
          onChange={(e) =>
            setSelectedProject(prev => ({ ...prev, description: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Location"
          value={selectedProject?.location || ''}
          onChange={(e) =>
            setSelectedProject(prev => ({ ...prev, location: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedProject?.status || ''}
            label="Status"
            onChange={(e) =>
              setSelectedProject(prev => ({ ...prev, status: e.target.value }))
            }
          >
            {projectStatuses.map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          component="label"
        >
          Upload Files
          <input
            type="file"
            multiple
            hidden
            onChange={handleFileUpload}
            accept="image/*,.pdf"
          />
        </Button>
      </Grid>
      {uploadedFiles.length > 0 && (
        <Grid item xs={12}>
          <Typography variant="subtitle1">Uploaded Files:</Typography>
          <ImageList sx={{ width: '100%', height: 200 }} cols={4} rowHeight={164}>
            {uploadedFiles.map((file, index) => (
              <ImageListItem key={index}>
                {file.mimetype.includes('image') ? (
                  <img
                    src={file.url}
                    alt={file.filename}
                    loading="lazy"
                  />
                ) : (
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #ddd'
                    }}
                  >
                    <Typography>{file.filename}</Typography>
                  </Box>
                )}
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      )}
    </Grid>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Construction Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedProject({});
            setCreateDialog(true);
          }}
        >
          Add Project
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((project) => (
                <TableRow key={project.project_id}>
                  <TableCell>{project.project_id}</TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>{project.location}</TableCell>
                  <TableCell>
                    <Chip
                      label={project.status}
                      color={
                        project.status === 'Completed' ? 'success' :
                        project.status === 'In Progress' ? 'warning' :
                        project.status === 'On Hold' ? 'error' : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => {
                      setSelectedProject(project);
                      setViewDialog(true);
                    }}>
                      <ViewIcon />
                    </IconButton>
                    <IconButton onClick={() => {
                      setSelectedProject(project);
                      setEditDialog(true);
                    }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteProject(project.project_id)}>
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
          count={projects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>

      {/* Create Dialog */}
      <Dialog
        open={createDialog}
        onClose={() => {
          setCreateDialog(false);
          setSelectedProject(null);
          setUploadedFiles([]);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <ProjectForm mode="create" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateProject} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={editDialog}
        onClose={() => setEditDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <ProjectForm mode="edit" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateProject} variant="contained">
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
        <DialogTitle>Project Details</DialogTitle>
        <DialogContent>
          {selectedProject && (
            <Grid container spacing={2} sx={{ pt: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h6">{selectedProject.title}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Category:</strong> {selectedProject.category}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Status:</strong> {selectedProject.status}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Location:</strong> {selectedProject.location}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Description:</strong></Typography>
                <Typography>{selectedProject.description}</Typography>
              </Grid>
              {selectedProject.media && selectedProject.media.length > 0 && (
                <Grid item xs={12}>
                  <Typography><strong>Project Media:</strong></Typography>
                  <ImageList sx={{ width: '100%', height: 300 }} cols={3} rowHeight={164}>
                    {selectedProject.media.map((file, index) => (
                      <ImageListItem key={index}>
                        {file.type === 'image' ? (
                          <img
                            src={file.url}
                            alt={`Project media ${index + 1}`}
                            loading="lazy"
                          />
                        ) : (
                          <Box
                            sx={{
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid #ddd'
                            }}
                          >
                            <Typography>Document: {file.filename}</Typography>
                          </Box>
                        )}
                      </ImageListItem>
                    ))}
                  </ImageList>
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

export default ConstructionProjects; 