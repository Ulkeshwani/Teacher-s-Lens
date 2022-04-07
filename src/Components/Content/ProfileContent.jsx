import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  subtitle,
} from "@mui/material";
import Chip from "@mui/material/Chip";

const ProfileContent = () => {
  return (
    <Card>
      <CardContent
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Avatar
            src="/static/mock-image/avatars/avatar_23.jpg"
            sx={{
              height: 64,
              mb: 2,
              width: 64,
              borderRadius: 3,
            }}
          />
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              paddingLeft: 2,
            }}
          >
            <Typography gutterBottom variant="h6">
              Name: Ulkesh Wani
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle"
              style={{ textAlign: "center" }}
            >
              Organisation: JSPM
            </Typography>
          </Box>
        </Box>
        <Chip label={"Admin"} color="primary" />
      </CardContent>
      <Divider />
    </Card>
  );
};

export default ProfileContent;
