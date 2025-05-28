
import { AuthContext } from './Context/AuthContext';
import React, { useContext, useState } from "react";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;