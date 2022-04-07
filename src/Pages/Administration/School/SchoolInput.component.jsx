import React from "react";
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

const SchoolInput = ({
  props,
  handleDialog,
  //   organisationData,
  //   RolesData,
}) => {
  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    resetForm,
  } = props;
  const validateVolunteerRejx = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <FormikProvider value={props}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              placeholder="Name"
              {...getFieldProps("name")}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              type="email"
              placeholder="Email"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type="number"
              placeholder="Mobile"
              {...getFieldProps("contactNumber")}
              onKeyPress={validateVolunteerRejx}
              error={Boolean(touched.contactNumber && errors.contactNumber)}
              helperText={touched.contactNumber && errors.contactNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              multiline
              rows={3}
              fullWidth
              type="text"
              placeholder="Address"
              {...getFieldProps("address")}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel
                id="organization-select-label"
                sx={{ color: "#a6a1a1" }}
              >
                Select Organisation
              </InputLabel>
              <Select
                required
                labelId="organisation-select-label"
                label="Select Organisation"
                placeholder="Select Organisation"
                id="select-organisation"
                defaultValue=""
                {...getFieldProps("organisation")}
                error={Boolean(touched.organisation && errors.organisation)}
                helperText={touched.organisation && errors.organisation}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="JSPM">JSPM</MenuItem>
                <MenuItem value="PCCOE">PCCOE</MenuItem>
                <MenuItem value="DYPATIL">Dr.DY Patil</MenuItem>
              </Select>
              <FormHelperText sx={{ color: "red" }}>
                {touched.role && errors.role}
              </FormHelperText>
            </FormControl>
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
            onClick={handleSubmit}
            loading={isSubmitting}
            style={{ marginRight: 5 }}
          >
            Add
          </LoadingButton>
        </Container>
      </Form>
    </FormikProvider>
  );
};

export default SchoolInput;
