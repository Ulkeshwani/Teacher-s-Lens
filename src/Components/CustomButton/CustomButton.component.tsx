import React from "react";
import { LoadingButton } from "@mui/lab";

import "./CustomButton.styles.css";

const CustomButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <LoadingButton
      onClick={props.onClick}
      title={props.title}
      loading={props.loading}
      {...props}
    >
      {props.children}
    </LoadingButton>
  );
};

export default CustomButton;
