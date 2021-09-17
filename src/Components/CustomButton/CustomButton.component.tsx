import React from "react";
import { Button } from "@mui/material";

import "./CustomButton.styles.css";

const CustomButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <Button onClick={props.onClick} {...props}>
      {props.children}
    </Button>
  );
};

export default CustomButton;
