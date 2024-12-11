import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import SmartPackages from './pages/services/SmartPackages';
import BrandPromotion from './pages/services/BrandPromotion';
import Finance from './pages/services/Finance';
import Construction from './pages/services/Construction';
import DesignSolutions from './pages/services/DesignSolutions';
import Services from './pages/Services';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './pages/admin/Dashboard';
import DesignProjects from './pages/admin/DesignProjects';
import ProductListing from './pages/ProductListing';
import AdminLayout from './components/admin/AdminLayout';
import AdminRoute from './components/admin/AdminRoutes';
import ConstructionProjects from './pages/admin/ConstructionProjects';
import UserManagement from './pages/admin/UserManagement';
import ReviewManagement from './pages/admin/ReviewManagement';
import PropertyManagement from './pages/admin/PropertyManagement';
import Dashboard from './pages/dashboard/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Material UI imports
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './utils/theme';
import { SnackbarProvider } from 'notistack';

// Global styles
import './styles/main.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider 
        maxSnack={3} 
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        preventDuplicate
      >
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/services/smart-packages" element={<Layout><SmartPackages /></Layout>} />
          <Route path="/services/brand-promotion" element={<Layout><BrandPromotion /></Layout>} />
          <Route path="/services/finance" element={<Layout><Finance /></Layout>} />
          <Route path="/services/construction" element={<Layout><Construction /></Layout>} />
          <Route path="/services/design" element={<Layout><DesignSolutions /></Layout>} />
          <Route path="/services" element={<services/>}/>
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={
            <AdminRoute>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="design-projects" element={<DesignProjects />} />
                  <Route path="construction" element={<ConstructionProjects />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="reviews" element={<ReviewManagement />} />
                  <Route path="properties" element={<PropertyManagement />} />
                </Routes>
              </AdminLayout>
            </AdminRoute>
          } />
          <Route path="/list-property" element={<Layout><ProductListing /></Layout>} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App; 