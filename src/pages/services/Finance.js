import React, { useState } from 'react';
import {
  Container, Grid, Typography, Box, Card, CardContent, Button,
  TextField, Slider, Paper, Divider, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, Alert, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Calculate, 
  FileUpload, 
  Info, 
  Send,
  Close as CloseIcon,
  Home,
  Landscape,
  Construction,
  Check
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

// EMI Calculator Component
const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [emi, setEMI] = useState(0);

  const calculateEMI = () => {
    const principal = loanAmount;
    const rateOfInterest = interestRate / 12 / 100;
    const numberOfMonths = loanTenure * 12;
    
    const emi = principal * rateOfInterest * Math.pow(1 + rateOfInterest, numberOfMonths) / 
                (Math.pow(1 + rateOfInterest, numberOfMonths) - 1);
    
    setEMI(Math.round(emi));
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          EMI Calculator
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography gutterBottom>Loan Amount: ₹{loanAmount.toLocaleString()}</Typography>
            <Slider
              value={loanAmount}
              onChange={(_, value) => setLoanAmount(value)}
              min={100000}
              max={10000000}
              step={100000}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Interest Rate: {interestRate}%</Typography>
            <Slider
              value={interestRate}
              onChange={(_, value) => setInterestRate(value)}
              min={5}
              max={20}
              step={0.1}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Loan Tenure: {loanTenure} Years</Typography>
            <Slider
              value={loanTenure}
              onChange={(_, value) => setLoanTenure(value)}
              min={1}
              max={30}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value} Years`}
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              fullWidth 
              onClick={calculateEMI}
              startIcon={<Calculate />}
            >
              Calculate EMI
            </Button>
          </Grid>
          {emi > 0 && (
            <Grid item xs={12}>
              <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}>
                <Typography variant="h6" align="center">
                  Your Monthly EMI
                </Typography>
                <Typography variant="h4" align="center">
                  ₹{emi.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

// Loan Application Form
const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  dob: Yup.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .required('Date of birth is required'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid mobile number')
    .required('Mobile number is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  panCard: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number')
    .required('PAN number is required'),
  aadharCard: Yup.string()
    .matches(/^[0-9]{12}$/, 'Invalid Aadhar number')
    .required('Aadhar number is required'),
  permanentAddress: Yup.string().required('Permanent address is required'),
  residentialAddress: Yup.string().required('Residential address is required'),
  aadharFront: Yup.mixed().required('Aadhar front image is required'),
  aadharBack: Yup.mixed().required('Aadhar back image is required'),
  panCardImage: Yup.mixed().required('PAN card image is required'),
  photo: Yup.mixed().required('Passport size photo is required')
});

// Loan Information Data
const loanTypes = [
  {
    title: "Home Loan",
    description: "Get your dream home with our affordable home loans starting at 8.5% p.a.",
    features: [
      "Loan amount up to ₹5 Crore",
      "Tenure up to 30 years",
      "Quick approval process",
      "Minimal documentation",
      "No prepayment charges"
    ],
    icon: <Home sx={{ fontSize: 40 }} />,
    color: "#2196f3"
  },
  {
    title: "Plot Loan",
    description: "Purchase residential or commercial plots with competitive interest rates.",
    features: [
      "Up to 85% of plot value",
      "Flexible repayment options",
      "Tenure up to 15 years",
      "Transparent process",
      "Expert guidance"
    ],
    icon: <Landscape sx={{ fontSize: 40 }} />,
    color: "#4caf50"
  },
  {
    title: "Construction Loan",
    description: "Finance your construction project with our specialized loans.",
    features: [
      "Customized payment schedule",
      "Stage-wise disbursement",
      "Technical assistance",
      "Competitive rates",
      "Flexible terms"
    ],
    icon: <Construction sx={{ fontSize: 40 }} />,
    color: "#ff9800"
  }
];

const blogPosts = [
  {
    title: "Understanding Home Loan EMI",
    content: "Learn how EMI is calculated and factors affecting your monthly payments...",
    date: "Feb 15, 2024",
    readTime: "5 min read"
  },
  {
    title: "Tips for Quick Loan Approval",
    content: "Essential documents and steps to ensure fast loan approval...",
    date: "Feb 10, 2024",
    readTime: "4 min read"
  },
  {
    title: "Home Loan Tax Benefits",
    content: "Explore the tax advantages of taking a home loan under Indian law...",
    date: "Feb 5, 2024",
    readTime: "6 min read"
  }
];

const Finance = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      dob: '',
      mobile: '',
      email: '',
      panCard: '',
      aadharCard: '',
      permanentAddress: '',
      residentialAddress: '',
      aadharFront: null,
      aadharBack: null,
      panCardImage: null,
      photo: null
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Create FormData for file upload
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          if (values[key] instanceof File) {
            formData.append(key, values[key]);
          } else {
            formData.append(key, values[key]);
          }
        });

        // Send to backend
        const response = await fetch('/api/finance/apply', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error('Application submission failed');

        enqueueSnackbar('Application submitted successfully!', { variant: 'success' });
        setFormDialogOpen(false);
        formik.resetForm();
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  });

  const handleFileChange = (event, field) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        enqueueSnackbar('File size should not exceed 5MB', { variant: 'error' });
        return;
      }
      formik.setFieldValue(field, file);
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
          color: 'white',
          py: 12,
          mb: 8
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 700 }}>
              Financial Services
            </Typography>
            <Typography variant="h5" align="center" sx={{ opacity: 0.9 }}>
              Calculate your EMI and apply for loans with ease
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {/* EMI Calculator Section */}
          <Grid item xs={12} md={6}>
            <EMICalculator />
          </Grid>

          {/* Loan Information Section */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Apply for Loan
                </Typography>
                <Typography paragraph>
                  Get hassle-free loans with competitive interest rates and flexible repayment options.
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Required Documents:
                  </Typography>
                  <ul>
                    <li>Aadhar Card (Front & Back)</li>
                    <li>PAN Card</li>
                    <li>Passport Size Photograph</li>
                    <li>Address Proof</li>
                  </ul>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setFormDialogOpen(true)}
                  startIcon={<Send />}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Loan Types Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Our Loan Products
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Choose from our range of specialized loan products
          </Typography>
          
          <Grid container spacing={4}>
            {loanTypes.map((loan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card sx={{ height: '100%', position: 'relative' }}>
                    <CardContent>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        color: loan.color 
                      }}>
                        {loan.icon}
                        <Typography variant="h5" sx={{ ml: 1 }}>
                          {loan.title}
                        </Typography>
                      </Box>
                      <Typography paragraph color="text.secondary">
                        {loan.description}
                      </Typography>
                      <List>
                        {loan.features.map((feature, i) => (
                          <ListItem key={i} sx={{ py: 0.5 }}>
                            <ListItemIcon>
                              <Check sx={{ color: loan.color }} />
                            </ListItemIcon>
                            <ListItemText primary={feature} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Blog Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Financial Insights
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Stay informed with our latest articles and guides
          </Typography>

          <Grid container spacing={4}>
            {blogPosts.map((post, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {post.title}
                      </Typography>
                      <Typography color="text.secondary" paragraph>
                        {post.content}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        mt: 2,
                        color: 'text.secondary'
                      }}>
                        <Typography variant="caption">
                          {post.date}
                        </Typography>
                        <Typography variant="caption">
                          {post.readTime}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Documents Required Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Required Documents
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Keep these documents ready for quick loan processing
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Identity & Address Proof
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><Check color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Aadhar Card" 
                        secondary="Both front and back sides required"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Check color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="PAN Card" 
                        secondary="Mandatory for all loan applications"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Check color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Passport Size Photos" 
                        secondary="Recent photographs required"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Financial Documents
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><Check color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Bank Statements" 
                        secondary="Last 6 months statements"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Check color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Salary Slips" 
                        secondary="Last 3 months for salaried individuals"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Check color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Income Tax Returns" 
                        secondary="Last 2 years returns"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Loan Application Form Dialog */}
      <Dialog 
        open={formDialogOpen} 
        onClose={() => setFormDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Loan Application Form
          <IconButton
            onClick={() => setFormDialogOpen(false)}
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
                  label="Full Name"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                  error={formik.touched.dob && Boolean(formik.errors.dob)}
                  helperText={formik.touched.dob && formik.errors.dob}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                  helperText={formik.touched.mobile && formik.errors.mobile}
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
                  label="PAN Card Number"
                  name="panCard"
                  value={formik.values.panCard}
                  onChange={formik.handleChange}
                  error={formik.touched.panCard && Boolean(formik.errors.panCard)}
                  helperText={formik.touched.panCard && formik.errors.panCard}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Aadhar Card Number"
                  name="aadharCard"
                  value={formik.values.aadharCard}
                  onChange={formik.handleChange}
                  error={formik.touched.aadharCard && Boolean(formik.errors.aadharCard)}
                  helperText={formik.touched.aadharCard && formik.errors.aadharCard}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Permanent Address"
                  name="permanentAddress"
                  multiline
                  rows={2}
                  value={formik.values.permanentAddress}
                  onChange={formik.handleChange}
                  error={formik.touched.permanentAddress && Boolean(formik.errors.permanentAddress)}
                  helperText={formik.touched.permanentAddress && formik.errors.permanentAddress}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Residential Address"
                  name="residentialAddress"
                  multiline
                  rows={2}
                  value={formik.values.residentialAddress}
                  onChange={formik.handleChange}
                  error={formik.touched.residentialAddress && Boolean(formik.errors.residentialAddress)}
                  helperText={formik.touched.residentialAddress && formik.errors.residentialAddress}
                />
              </Grid>

              {/* Document Upload Section */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Document Upload
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Please upload clear, colored scans or photos. Maximum file size: 5MB
                </Alert>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<FileUpload />}
                >
                  Aadhar Card Front
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'aadharFront')}
                  />
                </Button>
                {formik.touched.aadharFront && formik.errors.aadharFront && (
                  <Typography color="error" variant="caption">
                    {formik.errors.aadharFront}
                  </Typography>
                )}
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<FileUpload />}
                >
                  Aadhar Card Back
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'aadharBack')}
                  />
                </Button>
                {formik.touched.aadharBack && formik.errors.aadharBack && (
                  <Typography color="error" variant="caption">
                    {formik.errors.aadharBack}
                  </Typography>
                )}
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<FileUpload />}
                >
                  PAN Card
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'panCardImage')}
                  />
                </Button>
                {formik.touched.panCardImage && formik.errors.panCardImage && (
                  <Typography color="error" variant="caption">
                    {formik.errors.panCardImage}
                  </Typography>
                )}
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<FileUpload />}
                >
                  Passport Size Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'photo')}
                  />
                </Button>
                {formik.touched.photo && formik.errors.photo && (
                  <Typography color="error" variant="caption">
                    {formik.errors.photo}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
          >
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Finance; 