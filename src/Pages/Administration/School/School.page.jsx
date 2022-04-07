import * as React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Navigator from "Components/Navigation2.0/Navigator";
import Header from "Components/Header/Header";
import SchoolContent from "Components/Content/SchoolContent";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/dashboard/app">
        Teacher's Lens
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const drawerWidth = 260;

function School() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const schoolSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^\S+[A-Za-z\s]{2,15}$/,
        "First name should be 3 to 15 character long and it should not start with blank space and not have special character and number."
      )
      .required("This field is required."),
    email: Yup.string()
      .email("Email must be a valid email address.")
      .matches(
        /^[A_Za-z0-9_.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        "Email must be a valid email address."
      )
      .required("This field is required."),
    organisation: Yup.string().nullable().required("This field is required."),
    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid contact number.")
      .nullable()
      .required("This field is required."),
    address: Yup.string()
      .matches(
        /^\S+[A-Za-z0-9\s!@#$%^&)(+,._-]{2,100}$/,
        "Address length should be 3 to 500 character long and it should not start with space."
      )
      .required("This field is required."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      organisation: "",
      contactNumber: "",
      address: "",
    },
    validationSchema: schoolSchema,
    onSubmit: async () => {},
  });

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  console.log(formik);

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
        <Header
          onDrawerToggle={handleDrawerToggle}
          title="Schools & Colleges"
        />
        <Box
          component="main"
          sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
        >
          <SchoolContent formikProps={formik} />
        </Box>
        <Box component="footer" sx={{ p: 2, bgcolor: "#000000" }}>
          <Copyright />
        </Box>
      </Box>
    </Box>
  );
}
export default School;
