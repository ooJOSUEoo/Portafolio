import React from 'react'
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({
    isLoggedIn,
    children,
  }) => {
  
    return isLoggedIn ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  }
