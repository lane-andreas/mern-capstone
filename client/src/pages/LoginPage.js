import React from "react";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated, loginError } = useAuth();

  // Only redirect if authenticated AND there's no login error
  if (isAuthenticated && !loginError) {
    return <Navigate to="/content" replace />;
  }

  return <LoginForm />;
};

export default LoginPage;
