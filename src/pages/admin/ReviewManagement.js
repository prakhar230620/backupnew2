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
  Chip,
  Rating
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/admin/reviews');
      setReviews(response.data);
    } catch (error) {
      enqueueSnackbar('Error fetching reviews', { variant: 'error' });
    }
  };

  const handleUpdateStatus = async (reviewId, status) => {
    try {
      await axios.put(`/api/admin/reviews/${reviewId}`, { status });
      fetchReviews();
      enqueueSnackbar('Review status updated successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error updating review status', { variant: 'error' });
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`/api/admin/reviews/${reviewId}`);
        fetchReviews();
        enqueueSnackbar('Review deleted successfully', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar('Error deleting review', { variant: 'error' });
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Review Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((review) => (
                <TableRow key={review.review_id}>
                  <TableCell>{review.review_id}</TableCell>
                  <TableCell>{review.user_name}</TableCell>
                  <TableCell>
                    <Rating value={review.rating} readOnly />
                  </TableCell>
                  <TableCell>{review.comment}</TableCell>
                  <TableCell>
                    <Chip
                      label={review.status}
                      color={
                        review.status === 'approved'
                          ? 'success'
                          : review.status === 'pending'
                          ? 'warning'
                          : 'error'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(review.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleUpdateStatus(review.review_id, 'approved')}
                      color="success"
                    >
                      <ApproveIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleUpdateStatus(review.review_id, 'rejected')}
                      color="error"
                    >
                      <RejectIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteReview(review.review_id)}
                    >
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
          count={reviews.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
    </Box>
  );
};

export default ReviewManagement; 