import React from "react";
import { Button, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container, Box, Typography, Grid } from "@mui/material";
import Header from "Components/Header/Header";
import Navigator from "Components/Navigation2.0/Navigator";
import { DrawerConstants } from "utils/Constants";

const Conversation = () => {
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
          width: { sm: DrawerConstants.DRAWER_WIDTH },
          flexShrink: { sm: 0 },
        }}
      >
        {isSmUp ? null : (
          <Navigator isOpenSidebar={open} onCloseSidebar={handleDrawerToggle} />
        )}
        <Navigator isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header
          onDrawerToggle={handleDrawerToggle}
          title="Create Conversations"
          showRoomButton
        />
        <Box
          component="main"
          sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
        ></Box>
      </Box>
    </Box>
  );
};

export default Conversation;
