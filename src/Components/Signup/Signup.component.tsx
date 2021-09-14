import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, InputBase } from "@material-ui/core";
import { WeIcon, EmailIcon } from "../../Assets/Icons";
import CustomButton from "Components/CustomButton/CustomButton.component";

import "./Signup.styles.css";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    width: "80%",
    color: "white",
    borderBottom: "2px solid white",
  },
}));

const SignUp: React.FC = () => {
  const classes = useStyles();
  return (
    <div className="signup_wrapper">
      <span className="heading">Join Us</span>
      <form className="signup_container">
        <Grid container spacing={1} xl={12} xs={12} alignItems="flex-end">
          <Grid item>
            <EmailIcon />
          </Grid>
          <Grid item xl={10} xs={11}>
            <InputBase placeholder="Email" className={classes.textField} />
          </Grid>
          <Grid item>
            <WeIcon />
          </Grid>
          <Grid item xl={10} xs={11}>
            <InputBase placeholder="Password" className={classes.textField} />
          </Grid>
          <Grid item xl={10} xs={11}>
            <div className="_Button_Container">
              <CustomButton className="_signup_Button">Join US</CustomButton>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SignUp;
