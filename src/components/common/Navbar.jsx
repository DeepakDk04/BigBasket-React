import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";

import FilterProducts from "../Products/FilterProducts";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  navButtons: {
    backgroundColor: theme.palette.primary.light,
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleDrawer = () => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen((prevState) => !prevState);
  };

  const handleLogin = () => {
    setLoggedIn((prevStatus) => !prevStatus);
  };

  const handleLogout = () => {
    setLoggedIn((prevStatus) => !prevStatus);
    handleMobileMenuClose();
  };

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show cart items" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>My Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="account of current user" color="inherit">
          <Badge badgeContent={3} color="secondary">
            <AccountCircleIcon />
          </Badge>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={() => handleLogout()}>
        <IconButton
          aria-label="logging out of current user"
          aria-controls="account-logout"
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={toggleDrawer()} size="medium">
            <MenuIcon />
          </IconButton>

          <SwipeableDrawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer()}
            onOpen={toggleDrawer()}
          >
            <FilterProducts />
          </SwipeableDrawer>
        </Hidden>
        <Typography variant="h6" noWrap>
          DK Grocery Store
        </Typography>
        <div className={classes.grow} />
        {loggedIn && (
          <IconButton aria-label="show new notifications" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        )}
        <div>
          {loggedIn ? (
            <div>
              <div className={classes.sectionDesktop}>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.navButtons}
                  startIcon={<ShoppingCartIcon />}
                >
                  Cart
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.navButtons}
                  startIcon={<AccountCircleIcon />}
                >
                  Profile
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.navButtons}
                  startIcon={<ExitToAppIcon />}
                  onClick={() => handleLogout()}
                >
                  Logout
                </Button>
              </div>

              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls="primary-search-account-menu-mobile"
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
                {renderMobileMenu}
              </div>
            </div>
          ) : (
            <div>
              <div className={classes.sectionDesktop}>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.navButtons}
                  onClick={() => handleLogin()}
                >
                  Login
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.navButtons}
                >
                  Sign Up
                </Button>
              </div>
              <div className={classes.sectionMobile}>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.navButtons}
                  size="small"
                  onClick={() => handleLogin()}
                >
                  Login
                </Button>
              </div>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
