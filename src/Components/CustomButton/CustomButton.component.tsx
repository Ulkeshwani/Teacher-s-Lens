import React from "react";
import { Button } from "@material-ui/core";

import "./CustomButton.styles.css";

const CustomButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <Button onClick={props.onClick} {...props}>
      {props.children}
    </Button>
  );
};

export default CustomButton;
