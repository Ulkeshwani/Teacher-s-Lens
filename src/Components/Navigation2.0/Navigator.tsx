import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
// mocks_
// import account from "../../_mocks_/account";
// hooks
import useResponsive from "../../Hooks/useResponsive";
// components
// import Logo from "../../components/Logo";
// import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../Components/NavSection/NavSection";
//
import sidebarConfig from "./sidebarConfig";
import { useHistory } from "react-router-dom";
import { Icon } from "@iconify/react";
import safetyGoggles from "@iconify/icons-mdi/safety-goggles";
import { auth, firestoreDB, logout } from "utils/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 270;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.background.paper,
}));

// ----------------------------------------------------------------------

type userProps = {
  uid: string;
  email: string;
  name: string;
  role: string;
  active: boolean;
  authProvider: string;
};

interface NavigatorProps {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
}

export default function Navigator({
  isOpenSidebar,
  onCloseSidebar,
}: NavigatorProps) {
  const { pathname } = useLocation();
  const history = useHistory();

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [userData, setUserData] = useState<userProps>({
    uid: "",
    email: "",
    name: "",
    role: "",
    active: false,
    authProvider: "",
  });

  const isDesktop = useResponsive("up", "sm");

  const fetchUserName = async () => {
    try {
      const q = query(
        collection(firestoreDB, "users"),
        where("email", "==", user?.email)
      );
      const doc = await getDocs(q);
      console.log(doc);
      const data = doc.docs[0].data();
      setUserData({
        uid: data.uid,
        email: data.email,
        name: data.name,
        role: data.role,
        active: data.active,
        authProvider: data.authProvider,
      });
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    if (!user) return history.replace("/login");
    fetchUserName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <>
      <Box
        sx={{
          px: 2.5,
          py: 3,
          display: "inline-flex",
          justifyContent: "space-evenly",
        }}
      >
        <Icon icon={safetyGoggles} style={{ zoom: 2 }} />
        <Typography variant="h6" color="white">
          Teacher's Lens
        </Typography>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {"Ulkesh Wani"}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                {userData?.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig} userRole={userData.role} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: "relative" }}
        ></Stack>
      </Box>
    </>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "#17252a",
              borderRightStyle: "dashed",
              color: "white",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}

Navigator.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};
