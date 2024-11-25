import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Box, TextField, Button, Typography, Container } from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginError } = useAuth();

  const handleLogin = async (e) => {
    if (e) {
      e.preventDefault();
    }
    await login(email, password);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <div style={{ width: "100%", marginTop: "1rem" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="off"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && (
            <Typography
              color="error"
              sx={{
                mt: 1,
                textAlign: "center",
                padding: "8px",
                backgroundColor: "#ffebee",
                borderRadius: "4px",
                fontWeight: 500,
              }}
            >
              {loginError}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default LoginForm;
