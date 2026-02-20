import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import techoverLogo from "./assets/techover-logo-dark.png";

import HomePage from "./pages/HomePage";
import CountryPage from "./pages/CountryPage";
import NotFound from "./pages/NotFound";
import MoonIcon from "./icons/moon.svg";

const queryClient = new QueryClient();

function AppRoutes() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<HomePage />} />
      <Route path="/country/:code" element={<CountryPage key={location.pathname} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#202C36" : "#F2F2F2",
        paper: darkMode ? "#2B3844" : "#FFFFFF",
      },
      text: {
        primary: darkMode ? "#FFFFFF" : "#111517",
        secondary: darkMode ? "#C4C4C4" : "#6B7280",
      },
    },
    typography: {
      fontFamily: "'Open Sans', sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppBar position="sticky" color="default" elevation={2}>
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: { xs: 2, sm: 4 },
              }}
            >
              <Typography
                component={Link}
                to="/"
                fontWeight={800}
                sx={{ textDecoration: "none", color: "inherit", fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                The Flag App
              </Typography>

              <Box
                component={Link}
                to="/"
              sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={techoverLogo}
                  alt="Techover"
                  sx={{
                    height: 28,
                    filter: darkMode ? "invert(1)" : "none",
                  }}
                />
              </Box>

              <Button
                onClick={() => setDarkMode(!darkMode)}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "inherit",
                }}
              >
                <Box
                  component="img"
                  src={MoonIcon}
                  alt="Dark Mode Icon"
                  sx={{ width: 18, height: 18, filter: darkMode ? "invert(0)" : "invert(1)" }}
                />
                Dark Mode
              </Button>
            </Toolbar>
          </AppBar>

          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}