import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { DarkMode, LightMode } from "@mui/icons-material";

import HomePage from "./pages/HomePage";
import CountryPage from "./pages/CountryPage";
import NotFound from "./pages/NotFound";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MoonIcon from "./icons/moon.svg";

const queryClient = new QueryClient();

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
      fontWeightLight: 300,
      fontWeightMedium: 600,
      fontWeightBold: 800,
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
              }}
            >
              <Typography
                component={Link}
                to="/"
                variant="h6"
                fontWeight={800}
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                The Flag App
              </Typography>

              <Box
                component="img"
                src="/hero.png"
                alt="Hero"
                sx={{
                  height: 30,
                  mx: 2,
                  filter: darkMode ? "none" : "invert(1)",
                }}
              />

              <IconButton
                onClick={() => setDarkMode(!darkMode)}
                sx={{
                  borderRadius: "50%",
                  border: darkMode ? "1px solid #fff" : "1px solid #000",
                  color: "inherit",
                  p: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                
                <Box
                  component="img"
                  src={MoonIcon}
                  alt="Dark Mode Icon"
                  sx={{
                    height: 24,
                    filter: darkMode ? "invert(0)" : "invert(1)", 
                  }}
                />

                <Typography sx={{ ml: 1, fontSize: "0.875rem" }}>
                  Dark Mode
                </Typography>
              </IconButton>
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/country/:code" element={<CountryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}



