import * as React from "react";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Navigator from "../../Components/Navigation2.0/Navigator";
import Header from ".../../Components/Header/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestoreDB } from "utils/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import AnnouncementDatabaseService from "../../services/announcement.services";
import { useHistory } from "react-router";
import Announcement from "Components/Announcement/Announcement.component";

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

function Home() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [user, loading, error] = useAuthState(auth);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [data, setData] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    console.log(user);
    AnnouncementDatabaseService.getAll().on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let data = {
          key: childSnapshot.key,
          ...childSnapshot.val(),
        };
        setData((prevState) => [...prevState, data]);
      });
    });
    if (!user) history.replace("/login");
  }, [user, loading]);

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
        <Header onDrawerToggle={handleDrawerToggle} title="Dasboard" />
        <Box
          component="main"
          sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
        >
          <Grid container spacing={3}>
            {data.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.key}>
                <Announcement
                  author={item.author}
                  title={item.title}
                  createdAt={item.createdAt}
                  description={item.description}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box component="footer" sx={{ p: 2, bgcolor: "#000000" }}>
          <Copyright />
        </Box>
      </Box>
    </Box>
  );
}
export default Home;
