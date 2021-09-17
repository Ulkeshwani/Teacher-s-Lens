import React, { useState } from "react";
import { Grid, InputBase } from "@mui/material";
import CustomButton from "Components/CustomButton/CustomButton.component";
import { ArrowRight, EyeOpen } from "akar-icons";
import "./Signup.styles.css";

const textFieldStyles = {
  width: "80%",
  color: "#3aafa9",
  borderBottomColor: "white",
  borderBottom: "1px solid white",
  marginBottom: 10,
  height: 40,
  fontFamily: "Montserrat",
};

const SignUp: React.FC = () => {
  const [show, toggle] = useState(false);
  const _showPassword = () => {
    toggle(!show);
  };

  return (
    <div className="signup_wrapper">
      <span className="heading">Join Us</span>
      <form className="signup_container" noValidate>
        <Grid container spacing={1} xl={12} xs={12} alignItems="flex-end">
          <Grid item xl={12} xs={12}>
            <InputBase placeholder="Full Name" style={textFieldStyles} />
          </Grid>
          <Grid item xl={12} xs={12}>
            <InputBase
              type="email"
              required
              placeholder="Email"
              style={textFieldStyles}
            />
          </Grid>
          <Grid item xl={12} xs={12}>
            <InputBase
              type={show ? "text" : "password"}
              required
              placeholder="Create Password"
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
              <CustomButton className="_signup_Button">
                <ArrowRight
                  size={18}
                  style={{ marginRight: 10, fill: "white" }}
                />
                Join US
              </CustomButton>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SignUp;
