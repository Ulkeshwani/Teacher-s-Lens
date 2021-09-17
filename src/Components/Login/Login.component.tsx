import React, { useState } from "react";
import { Grid, InputBase } from "@mui/material";
import CustomButton from "Components/CustomButton/CustomButton.component";
import { PeopleGroup, EyeOpen } from "akar-icons";
import "./Login.styles.css";

const textFieldStyles = {
  width: "78%",
  color: "white",
  borderBottomColor: "white",
  borderBottom: "1px solid white",
  marginBottom: 10,
  height: 40,
  fontFamily: "Montserrat",
};

const Login: React.FC = () => {
  const [show, toggle] = useState(false);
  const _showPassword = () => {
    toggle(!show);
  };

  return (
    <div className="login_wrapper">
      <span className="heading">LOGIN HERE</span>
      <form className="login_container">
        <Grid container spacing={1} xl={12} xs={12} alignItems="flex-end">
          <Grid item xl={12} xs={12}>
            <InputBase placeholder="Email" style={textFieldStyles} />
          </Grid>
          <Grid item xl={12} xs={12}>
            <InputBase
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
            />
          </Grid>
          <Grid item xl={10} xs={10}>
            <div className="_Button_Container">
              <CustomButton className="_Login_Button">
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
    </div>
  );
};

export default Login;
