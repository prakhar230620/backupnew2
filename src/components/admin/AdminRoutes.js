import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user || user.user_type !== 'admin') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute; 