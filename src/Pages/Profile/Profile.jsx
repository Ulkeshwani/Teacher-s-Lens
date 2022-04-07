import * as React from "react";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Navigator from "../../Components/Navigation2.0/Navigator";
import Header from ".../../Components/Header/Header";
import ProfileContent from "Components/Content/ProfileContent";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/dashboard/app">
        Teacher's Lens
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const drawerWidth = 260;

function Profile() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        {isSmUp ? null : (
          <Navigator isOpenSidebar={open} onCloseSidebar={handleDrawerToggle} />
        )}
        <Navigator isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header onDrawerToggle={handleDrawerToggle} title="Profile" />
        <Box
          component="main"
          sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
        >
          <ProfileContent />
        </Box>
        <Box component="footer" sx={{ p: 2, bgcolor: "#000000" }}>
          <Copyright />
        </Box>
      </Box>
    </Box>
  );
}
export default Profile;
