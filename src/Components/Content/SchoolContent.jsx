import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import Model from "../Custom Model/Model.component";
import SchoolInput from "Pages/Administration/School/SchoolInput.component";
import SchoolDatabaseService from "../../services/school.services";

const columns = [
  {
    id: "name",
    label: "Institution Name",
    minWidth: 170,
    align: "left",
  },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 100 },
  {
    id: "contactNumber",
    label: "Contact Number",
    minWidth: 170,
    align: "center",
  },
  {
    id: "organisation",
    label: "Organisation",
    minWidth: 170,
    align: "center",
  },
];

export default function SchoolContent(props) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [schoolData, setSchoolData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const handleCustomModel = () => {
    setOpen(!open);
  };
  const { formikProps } = props;

  const handleRefreshData = () => {
    SchoolDatabaseService.getAll().on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let data = {
          key: childSnapshot.key,
          ...childSnapshot.val(),
        };
        setSchoolData((prevState) => [...prevState, data]);
      });
    });
  };

  React.useEffect(() => {
    handleRefreshData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: "block" }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
                onChange={(e) => setQuery(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Model
                open={open}
                handleDialog={handleCustomModel}
                title="Add School / College"
              >
                <SchoolInput
                  props={formikProps}
                  handleDialog={handleCustomModel}
                />
              </Model>
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                onClick={handleCustomModel}
              >
                Add School / College
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon
                    color="inherit"
                    sx={{ display: "block" }}
                    onClick={handleRefreshData}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {schoolData?.length > 0 ? (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {schoolData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10, 25, 100]}
            component="div"
            count={schoolData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Typography sx={{ my: 5, mx: 2 }} color="common.black" align="center">
          No Organisations for this project yet
        </Typography>
      )}
    </Paper>
  );
}
