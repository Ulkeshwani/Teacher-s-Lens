import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import Model from "../Custom Model/Model.component";
import UserInput from "Pages/Administration/User/UserInput.component";

export default function UserContent(props) {
  const [open, setOpen] = React.useState(false);
  const handleCustomModel = () => {
    setOpen(!open);
  };
  const { formikProps } = props;
  return (
    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: "block" }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Model
                open={open}
                handleDialog={handleCustomModel}
                title="Add User"
              >
                <UserInput
                  props={formikProps}
                  handleDialog={handleCustomModel}
                />
              </Model>
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                onClick={handleCustomModel}
              >
                Add User
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: "block" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} align="center">
        No users for this project yet
      </Typography>
    </Paper>
  );
}
