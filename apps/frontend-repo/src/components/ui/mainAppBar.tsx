import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { logout } from "@/stores/authSlice";
import { store } from "@/stores/store";

interface pageLists {
  name: string;
  path: string;
}

const pages: pageLists[] = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Update Form", path: "/dashboard/update-form" },
  { name: "Fetch with priority", path: "/dashboard/priority-fetch" },
];

const MainAppBar = () => {
  const { dispatch } = store;
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (page: pageLists) => {
    setAnchorElNav(null);
    redirect(page.path);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => handleCloseNavMenu(page)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}

              <MenuItem onClick={() => dispatch(logout())}>
                <Typography sx={{ textAlign: "center" }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EBuddy
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
            <Button
              onClick={() => dispatch(logout())}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              LOGOUT
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainAppBar;
