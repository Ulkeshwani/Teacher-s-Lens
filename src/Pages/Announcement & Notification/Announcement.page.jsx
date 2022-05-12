import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container, Box, Typography, Grid } from "@mui/material";
import Header from "Components/Header/Header";
import Navigator from "Components/Navigation2.0/Navigator";
import { DrawerConstants } from "utils/Constants";
import AnnouncementContent from "Components/Content/AnnouncementContent";

const AnnouncementPage = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const announcementSchema = Yup.object().shape({
    title: Yup.string()
      .matches(
        /^\S+[A-Za-z0-9\s!@#$%^&)(+,._-]{2,100}$/,
        "First name should be 3 to 50 character long and it should not start with blank space and not have special character and number."
      )
      .required("This field is required."),
    description: Yup.string()
      .matches(
        /^\S+[A-Za-z0-9\s!@#$%^&)(+,._-]{2,100}$/,
        "Address length should be 3 to 500 character long and it should not start with space."
      )
      .required("This field is required."),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: announcementSchema,
  });

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
          title="Announcements & Notifications"
        />
        <Box
          component="main"
          sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
        >
          <AnnouncementContent formikProps={formik} />
        </Box>
      </Box>
    </Box>
  );
};

export default AnnouncementPage;
