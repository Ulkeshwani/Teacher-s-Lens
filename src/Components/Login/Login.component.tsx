import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, InputBase, Button } from "@material-ui/core";
import { WeIcon, EmailIcon } from "../../Assets/Icons";
import "./Login.styles.scss";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    width: "80%",
    color: "white",
    borderBottom: "2px solid white",
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  return (
    <div className="login_wrapper">
      <span className="heading">LOGIN HERE</span>
      <form className="login_container">
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
          <Grid item xl={10} xs={10}>
            <div className="_Button_Container">
              <Button className="_Login_Button">LOGIN</Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
