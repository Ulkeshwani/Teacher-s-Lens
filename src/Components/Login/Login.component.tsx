import React, { useState } from "react";
import { useHistory } from "react-router";
import { Grid, InputBase, TextField, Box } from "@mui/material";
import CustomButton from "Components/CustomButton/CustomButton.component";
import {
  auth,
  logInWithEmailAndPassword,
  sendPasswordReset,
} from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { PeopleGroup, EyeOpen } from "akar-icons";
import "./Login.styles.css";
import { Notification } from "Components/Notification/Notification.component";
import Model from "../Custom Model/Model.component";

const textFieldStyles = {
  width: "80%",
  color: "white",
  borderBottomColor: "white",
  borderBottom: "1px solid white",
  marginBottom: 10,
  height: 40,
};

const Login: React.FC = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertType, setAlertType] = useState("");
  const [show, toggle] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace("/dashboard");
  }, [user, loading]);

  const _showPassword = () => {
    toggle(!show);
  };

  const handleAlert = () => {
    setAlert(!alert);
  };

  const handleCustomModel = () => {
    setOpen(!open);
  };

  const handleForgetPassword = () => {
    sendPasswordReset(email)
      .then((res) => {
        console.log(res);
        setAlertContent(!res ? "Reset Link Has Been Sent To Your Email" : res);
        setAlertType(!res ? "success" : "error");
        handleAlert();
      })
      .catch((err) => {
        setAlertContent(err.message);
        setAlertType("error");
        handleAlert();
      });
  };

  const handleLogin = () => {
    logInWithEmailAndPassword(email, password)
      .then((res: any) => {
        console.log(res);
        setAlertContent(res ? res : "Login Successful");
        setAlertType(res ? "error" : "success");
        handleAlert();
      })
      .catch((err: any) => {
        setAlertContent("Something went wrong");
        setAlertType("error");
        handleAlert();
      });
  };

  return (
    <div className="login_wrapper">
      <span className="heading">LOGIN HERE</span>
      <form className="login_container">
        <Grid container spacing={1}>
          <Grid item xl={12} xs={12}>
            <InputBase
              autoComplete="email"
              required
              placeholder="Email"
              style={textFieldStyles}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xl={12} xs={12}>
            <InputBase
              autoComplete="password"
              required
              type={show ? "text" : "password"}
              placeholder="Password"
              style={textFieldStyles}
              endAdornment={
                <EyeOpen
                  size={24}
                  onClick={_showPassword}
                  style={{ cursor: "pointer" }}
                />
              }
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xl={4} xs={10}>
            <CustomButton
              className="_Login_Button"
              loading={isLoading}
              onClick={handleLogin}
              variant="contained"
            >
              <PeopleGroup
                size={16}
                style={{ marginRight: 10, fill: "white" }}
              />
              LOGIN
            </CustomButton>
          </Grid>
          <Grid item xl={8} xs={12}>
            <CustomButton
              onClick={handleCustomModel}
              variant="text"
              style={{
                marginLeft: "200px",
              }}
            >
              Forget Password
            </CustomButton>
          </Grid>
          <Model
            open={open}
            handleDialog={handleCustomModel}
            title="Forget Password"
            message="Enter your email address and we will send you a link to reset your password"
            actions={[
              {
                title: "Cancel",
                onClick: handleCustomModel,
              },
              {
                title: "Send",
                onClick: handleForgetPassword,
                disabled: !email ? true : false,
              },
            ]}
          >
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                sx={{
                  "& .MuiInputBase-input": {
                    color: "black",
                    fontSize: "1rem",
                  },
                }}
                autoFocus
                id="standard-error-helper-text"
                defaultValue={email}
                label="Email Address"
                variant="standard"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
          </Model>
        </Grid>
      </form>
      <Notification
        message={alertContent}
        open={alert}
        onClose={handleAlert}
        severity={alertType}
      />
    </div>
  );
};

export default Login;
