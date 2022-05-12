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

const UserInput = ({
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
              placeholder="First Name"
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              placeholder="Last Name"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
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
          {/* <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel required id="organization-select-label">
                Select Organization
              </InputLabel>
              <Select
                labelId="organization-select-label"
                required
                label="Select Organization"
                id="select-origanization"
                {...getFieldProps("organisation")}
                error={Boolean(touched.organisation && errors.organisation)}
                helperText={touched.organisation && errors.organisation}
              >
                {organisationData.map((org) => {
                  const { organisation_id, organisation_name } = org;
                  return (
                    <MenuItem key={organisation_id} value={organisation_id}>
                      {organisation_name}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText sx={{ color: "red" }}>
                {touched.organisation && errors.organisation}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel required id="organization-select-label">
                Select Role
              </InputLabel>
              <Select
                required
                labelId="role-select-label"
                label="Select Role"
                id="select-role"
                {...getFieldProps("role")}
                error={Boolean(touched.role && errors.role)}
                helperText={touched.role && errors.role}
              >
                {RolesData.map((role) => {
                  const { role_id, role_name } = role;
                  return (
                    <MenuItem key={role_id} value={role_id}>
                      {role_name}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText sx={{ color: "red" }}>
                {touched.role && errors.role}
              </FormHelperText>
            </FormControl>
          </Grid> */}
          <Grid item xs={6}>
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
            <FormControl fullWidth>
              <InputLabel
                id="organization-select-label"
                sx={{ color: "#a6a1a1" }}
              >
                Select Role
              </InputLabel>
              <Select
                required
                labelId="role-select-label"
                label="Select Role"
                placeholder="Select Role"
                id="select-role"
                defaultValue=""
                {...getFieldProps("role")}
                error={Boolean(touched.role && errors.role)}
                helperText={touched.role && errors.role}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Teacher">Teacher</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Monitor">Admin</MenuItem>
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

export default UserInput;
