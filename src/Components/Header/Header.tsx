import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Model from "Components/Custom Model/Model.component";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router";
import { v1 as uuidv1 } from "uuid";

const lightColor = "rgba(255, 255, 255, 0.7)";
interface HeaderProps {
  title?: string;
  tabs?: any;
  onTabChange?: any;
  onTabChangeIndex?: any;
  onTabChangeIndexValue?: any;
  onDrawerToggle: () => void;
  showRoomButton?: boolean;
}

export default function Header(props: HeaderProps) {
  const history = useHistory();
  const { onDrawerToggle } = props;
  const [open, setOpen] = React.useState(false);
  const handleCustomModel = () => {
    setOpen(!open);
  };

  const handleCreateRoom = () => {
    const id = uuidv1();
    history.replace(`/Meet/${id}`);
  };

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Tooltip title="Alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src="/static/images/avatar/1.jpg" alt="Ulkesh" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color="inherit"
                sx={{ p: 0.5 }}
                onClick={() => history.replace("/login")}
              >
                <LogoutIcon color="inherit" sx={{ display: "block" }} />
                <Typography variant="caption" color="inherit">
                  Logout
                </Typography>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {props.title}
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Create Room">
                <IconButton color="inherit" onClick={handleCreateRoom}>
                  <VideoCallIcon />
                  <Typography color="inherit" variant="caption">
                    Create Room
                  </Typography>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      ></AppBar>
      <Model
        open={open}
        handleDialog={handleCustomModel}
        title="Custom Model"
      ></Model>
    </React.Fragment>
  );
}
