import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        py: 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left side - Logo and Navigation */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Typography
              variant="h6"
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                color: "#000",
                fontWeight: "bold",
                fontSize: "1.5rem",
                "&:hover": { opacity: 0.8 },
              }}
            >
              MERN
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                color="inherit"
                sx={{
                  color: "#666",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Company
              </Button>
              <Button
                color="inherit"
                sx={{
                  color: "#666",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Products
              </Button>
              <Button
                color="inherit"
                sx={{
                  color: "#666",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Solutions
              </Button>
            </Box>
          </Box>

          {/* Right side - Auth buttons */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {isAuthenticated ? (
              <>
                <Button
                  onClick={() => navigate("/content")}
                  sx={{
                    color: "#666",
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  Content Manager
                </Button>
                <Button
                  onClick={handleLogout}
                  sx={{
                    color: "#666",
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{
                  backgroundColor: "#4169E1",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 3,
                  "&:hover": {
                    backgroundColor: "#3154b3",
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
