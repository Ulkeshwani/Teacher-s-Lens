import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  Box,
  Typography,
} from "@mui/material";

interface ModelProps {
  children?: React.ReactChild;
  open: boolean;
  fullScreen?: boolean;
  title?: string;
  message?: string;
  handleDialog: () => void;
  actions?: {
    title: string;
    onClick: () => void;
    disabled?: boolean;
  }[];
  contentText?: string;
}

const Model = (props: ModelProps) => {
  const { children } = props;
  return (
    <Dialog
      open={props.open}
      onClose={props.handleDialog}
      fullScreen={props?.fullScreen}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle color="primary">{props?.title}</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText color="black">
          <strong>{props?.message}</strong>
        </DialogContentText>
        <Box sx={{ p: 1 }}>
          {!children ? (
            <Typography variant="body2">No Data Found</Typography>
          ) : (
            children
          )}
        </Box>
      </DialogContent>
      {props.actions ? (
        <DialogActions>
          {props.actions.map((action) => {
            return (
              <Button
                key={action.title}
                color="primary"
                onClick={action.onClick}
                variant="contained"
                disabled={action.disabled}
              >
                {action.title}
              </Button>
            );
          })}
        </DialogActions>
      ) : null}
    </Dialog>
  );
};

export default Model;
