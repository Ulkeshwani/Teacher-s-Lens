import React, { useState } from "react";
import { useHistory } from "react-router";
import { Grid, InputBase } from "@mui/material";
import CustomButton from "Components/CustomButton/CustomButton.component";
import { PeopleGroup, EyeOpen } from "akar-icons";
import "./Login.styles.css";
import { Notification } from "Components/Notification/Notification.component";
import { LoadingButton } from "@mui/lab";

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
  const _showPassword = () => {
    toggle(!show);
  };

  const handleAlert = () => {
    setAlert(!alert);
  };

  const handleLogin = () => {
    if (email === "" && password === "") {
      setAlertContent("Please Enter The Email and Password.");
      setAlertType("error");
      setAlert(true);
    } else if (email === "") {
      setAlertContent("Please Enter The Valid Email.");
      setAlertType("error");
      setAlert(true);
    } else if (password === "") {
      setAlertContent("Please Enter The Valid Password.");
      setAlertType("error");
      setAlert(true);
    } else if (email !== "Ulkeshwani007@gmail.com" && password !== "Admin007") {
      setAlertContent(`No Account Found With ${email}`);
      setAlertType("info");
      setAlert(true);
    } else {
      setAlertContent(`Welcome ${email}.`);
      setAlertType("success");
      setAlert(true);
      history.replace("/dashboard", {
        payload: {
          email: email,
        },
      });
    }
  };

  return (
    <div className="login_wrapper">
      <span className="heading">LOGIN HERE</span>
      <form className="login_container">
        <Grid container spacing={1} xl={12} xs={12} alignItems="flex-end">
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
          <Grid item xl={10} xs={10}>
            <div className="_Button_Container">
              <CustomButton
                className="_Login_Button"
                loading={isLoading}
                onClick={handleLogin}
              >
                <PeopleGroup
                  size={16}
                  style={{ marginRight: 10, fill: "white" }}
                />
                LOGIN
              </CustomButton>
            </div>
          </Grid>
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
