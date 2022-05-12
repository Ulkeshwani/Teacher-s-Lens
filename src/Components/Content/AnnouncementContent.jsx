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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Model from "../Custom Model/Model.component";
import AnnouncementInput from "Pages/Announcement & Notification/AnnouncementInput.component";
import AnnouncementDatabaseService from "../../services/announcement.services";
import Announcement from "Components/Announcement/Announcement.component";

const columns = [
  {
    id: "author",
    label: "Author",
    minWidth: 100,
    align: "left",
  },
  {
    id: "title",
    label: "Announcement Title",
    minWidth: 170,
    align: "left",
  },
  {
    id: "description",
    label: "Announcement Description",
    minWidth: 170,
    align: "left",
  },
  {
    id: "createdAt",
    label: "Date",
    minWidth: 170,
    align: "center",
  },
];

export default function AnnouncementContent(props) {
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [announcementData, setAnnouncementData] = React.useState([]);
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

  const handleCustomModel = () => {
    setOpen(!open);
  };

  const handleAnnouncementShow = () => {
    setShow(!show);
  };

  const { formikProps } = props;

  const handleRefreshData = () => {
    AnnouncementDatabaseService.getAll().on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let data = {
          key: childSnapshot.key,
          ...childSnapshot.val(),
        };
        setAnnouncementData((prevState) => [...prevState, data]);
      });
    });
  };

  React.useEffect(() => {
    handleRefreshData();
    console.log(announcementData);
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
              />
            </Grid>
            <Grid item>
              <Model
                open={open}
                handleDialog={handleCustomModel}
                title="Create Announcemnet"
              >
                <AnnouncementInput
                  props={formikProps}
                  handleDialog={handleCustomModel}
                />
              </Model>
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                onClick={handleCustomModel}
              >
                Create Announcement
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: "block" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {announcementData?.length > 0 ? (
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
                {announcementData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.key}
                        // onClick={handleAnnouncementShow}
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
            count={announcementData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Typography sx={{ my: 5, mx: 2 }} color="common.black" align="center">
          No Announcement Found
        </Typography>
      )}
      <Model
        open={show}
        handleDialog={handleAnnouncementShow}
        title="Announcement"
      >
        <Announcement />
      </Model>
    </Paper>
  );
}
