import React, { useState } from "react";
import { FormikProvider, Form, Field } from "formik";
import { makeStyles } from "@mui/styles";
import { Icon } from "@iconify/react";
// import FileUpload from 'react-mui-fileuploader';
import {
  Grid,
  TextField,
  Container,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AnnouncementDatabaseService from "../../services/announcement.services";
import { Notification } from "../../Components/Notification/Notification.component";

const AnnouncementInput = ({ props, handleDialog }) => {
  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    resetForm,
  } = props;

  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleAlert = () => {
    setAlert(!alert);
  };

  const validateVolunteerRejx = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <FormikProvider value={props}>
      <Form autoComplete="off" noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              placeholder="Name"
              {...getFieldProps("title")}
              error={Boolean(touched.title && errors.title)}
              helperText={touched.title && errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              multiline
              rows={4}
              fullWidth
              type="text"
              placeholder="Description"
              {...getFieldProps("description")}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
            />
          </Grid>
        </Grid>
        <Container
          style={{ padding: 20, display: "flex", justifyContent: "flex-end" }}
        >
          <LoadingButton
            variant="contained"
            onClick={() => {
              handleDialog();
              resetForm();
            }}
            style={{ marginRight: 5 }}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            onClick={() => {
              let data = {
                title: props.values.title,
                description: props.values.description,
                author: "Admin",
                createdAt: new Date().toDateString(),
              };
              AnnouncementDatabaseService.create(data)
                .then((res) => {
                  setAlertContent("Announcement Posted successfully");
                  setAlertType("success");
                  setAlert(true);
                })
                .then(() => {
                  handleDialog();
                  resetForm();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            loading={isSubmitting}
            style={{ marginRight: 5 }}
          >
            Add
          </LoadingButton>
        </Container>
      </Form>
      <Notification
        message={alertContent}
        open={alert}
        onClose={handleAlert}
        severity={alertType}
      />
    </FormikProvider>
  );
};

export default AnnouncementInput;
