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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RefreshIcon from "@mui/icons-material/Refresh";
import Model from "../Custom Model/Model.component";
import UserInput from "Pages/Administration/User/UserInput.component";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserDatabaseService from "../../services/user.services";
import { SeverityPill } from "Components/Serverity-pills/ServerityPills.component";

const columns = [
  {
    id: "firstName",
    label: "First Name",
    minWidth: 100,
    align: "left",
  },
  {
    id: "lastName",
    label: "Last Name",
    minWidth: 100,
    align: "left",
  },
  { id: "email", label: "Email", minWidth: 100, align: "left" },
  {
    id: "contactNumber",
    label: "Contact Number",
    minWidth: 100,
    align: "left",
  },
  {
    id: "role",
    label: "Role",
    minWidth: 100,
    align: "left",
  },
  {
    id: "active",
    label: "Active",
    minWidth: 100,
    align: "left",
  },
];

export default function UserContent(props) {
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const anchorOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRefreshData = () => {
    UserDatabaseService.getAll().on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let data = {
          key: childSnapshot.key,
          ...childSnapshot.val(),
        };
        setUserData((prevState) => [...prevState, data]);
      });
    });
  };

  React.useEffect(() => {
    handleRefreshData();
  }, []);

  const handleCustomModel = () => {
    setOpen(!open);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { formikProps } = props;

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
              />
            </Grid>
            <Grid item>
              <Model
                open={open}
                handleDialog={handleCustomModel}
                title="Add User"
              >
                <UserInput
                  props={formikProps}
                  handleDialog={handleCustomModel}
                />
              </Model>
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                onClick={handleCustomModel}
              >
                Add User
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
      {userData?.length > 0 ? (
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
                  <TableCell
                    key={"actions"}
                    align={"right"}
                    style={{ fontWeight: "bold" }}
                  >
                    {"Actions"}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.key}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          if (column.id === "active") {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  fontWeight: "bold",
                                  color: value ? "green" : "red",
                                }}
                              >
                                <SeverityPill
                                  color={value ? "success" : "warning"}
                                >
                                  {" "}
                                  {value ? "Active" : "Inactive"}
                                </SeverityPill>
                              </TableCell>
                            );
                          }
                          return (
                            <>
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            </>
                          );
                        })}
                        <TableCell key="actions" align="left">
                          <IconButton
                            id="basic-button"
                            aria-controls={
                              anchorOpen ? "basic-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={anchorOpen ? "true" : undefined}
                            onClick={handleClick}
                          >
                            <ExpandMoreIcon
                              color="inherit"
                              sx={{ display: "block" }}
                            />
                          </IconButton>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={anchorOpen}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <MenuItem onClick={handleClose}>Edit</MenuItem>
                            <MenuItem onClick={handleClose}>Delete</MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10, 25, 100]}
            component="div"
            count={userData.length}
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
