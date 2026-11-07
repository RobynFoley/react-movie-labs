
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import headerBackground from "../../images/background.jpg";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const menuOptions = [
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Top Rated", path: "/movies/topRated" },
    { label: "Option 4", path: "/movies/option4" },
    { label: "Option 5", path: "/movies/option5" },
    { label: "Option 6", path: "/movies/option6" },
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
<AppBar
  position="fixed"
  sx={{
    backgroundImage: `url(${headerBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
        <Toolbar>

          <Typography
            variant="h4"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => handleMenuSelect("/")}
          >  
          TMDB Client
          </Typography>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>

          <Button
            color="inherit"
            onClick={() => handleMenuSelect("/")}
          >
            Home
          </Button>

          <IconButton
            color="inherit"
            aria-label="open navigation menu"
            aria-controls={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            {menuOptions.map((opt) => (
              <MenuItem
                key={opt.label}
                onClick={() => handleMenuSelect(opt.path)}
              >
                {opt.label}
              </MenuItem>
            ))}
          </Menu>

        </Toolbar>
      </AppBar>

      <Offset />
    </>
  );
};

export default SiteHeader;
