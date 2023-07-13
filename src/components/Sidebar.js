import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dashboard from "../Assets/Images/svgs/dashboard.svg";
import booking from "../Assets/Images/svgs/bookings.svg";
import room from "../Assets/Images/svgs/rooms.svg";
import user from "../Assets/Images/svgs/users.svg";
import "./Sidebar.css";
import { Dashboard } from "./pages/Dashboard";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const Sidebar = () => {
  const toggleNav = useSelector((state) => state.meetings.isSideNavOpen);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={toggleNav}>
        <DrawerHeader></DrawerHeader>
        <Divider />
        <List component={"nav"}>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate("/dashboard")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: toggleNav ? "initial" : "center",
                px: 2.5,
              }}
              selected={pathname === "/dashboard"}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: toggleNav ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <img src={dashboard} alt="dashboard" />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: toggleNav ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate("/bookings")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: toggleNav ? "initial" : "center",
                px: 2.5,
              }}
              selected={pathname === "/bookings"}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: toggleNav ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <img src={booking} alt="bookings" />
              </ListItemIcon>
              <ListItemText
                primary="Bookings"
                sx={{ opacity: toggleNav ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate("/rooms")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: toggleNav ? "initial" : "center",
                px: 2.5,
              }}
              selected={pathname === "/rooms"}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: toggleNav ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <img src={room} alt="rooms" />
              </ListItemIcon>
              <ListItemText
                primary="Rooms"
                sx={{ opacity: toggleNav ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate("/users")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: toggleNav ? "initial" : "center",
                px: 2.5,
              }}
              selected={pathname === "/users"}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: toggleNav ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <img src={user} alt="user" />
              </ListItemIcon>
              <ListItemText
                primary="Users"
                sx={{ opacity: toggleNav ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
};
