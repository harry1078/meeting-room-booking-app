import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Autocomplete,
  Button,
  Chip,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import "./BookingList.css";
import { bookingStatus, roomType } from "../../../MockData";

export default function BookingList(props) {
  const {
    rows,
    deleteRecord,
    filterData,
    filterAllDetails,
    filterDataByStatus,
  } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteRecord(id);
      }
    });
  };

  const goToAddBookingsPage = () => {
    navigate("/addbookings");
  };

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ my: 2 }} className="mt-2 mb-2">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={roomType ? roomType : []}
          sx={{ width: 300 }}
          onChange={(e, v) => filterData(v)}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Search Bookings" />
          )}
        />

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={bookingStatus ? bookingStatus : []}
          sx={{ width: 200 }}
          onChange={(e, v) => filterDataByStatus(v)}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Search by status" />
          )}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Button variant="contained" onClick={filterAllDetails}>
          All
        </Button>
        <Button
          variant="contained"
          endIcon={<AddCircleIcon />}
          onClick={goToAddBookingsPage}
        >
          Add Booking
        </Button>
      </Stack>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align={"left"} style={{ minWidth: "130px" }}>
                  Room
                </TableCell>
                <TableCell align={"center"} style={{ minWidth: "124px" }}>
                  Date
                </TableCell>
                <TableCell align={"left"} style={{ minWidth: "124px" }}>
                  Name
                </TableCell>
                <TableCell align={"center"} style={{ minWidth: "124px" }}>
                  Total
                </TableCell>
                <TableCell align={"center"} style={{ minWidth: "124px" }}>
                  Status
                </TableCell>
                <TableCell align={"center"} style={{ minWidth: "124px" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.length !== 0 ? (
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align={"left"}> {row.room} </TableCell>
                        <TableCell align={"center"}> {row.date} </TableCell>
                        <TableCell align={"left"}> {row.name} </TableCell>
                        <TableCell align={"center"}>$ {row.total} </TableCell>
                        <TableCell align={"center"}>
                          <Chip
                            className={`status ${row.status}`}
                            label={row.status}
                            color="primary"
                            variant="filled"
                            size="small"
                          />
                        </TableCell>
                        <TableCell align={"left"}>
                          <Stack direction={"row"} justifyContent={"center"}>
                            <Tooltip title="Edit" placement="bottom-end">
                              <Button className="btnIcon">
                                <Link
                                  to={`/editbookings/${row.id}`}
                                  sx={{ height: "24px" }}
                                >
                                  <EditOutlinedIcon
                                    sx={{ cursor: "pointer" }}
                                    color="primary"
                                    className="cursor-pointer"
                                  />
                                </Link>
                              </Button>
                            </Tooltip>
                            <Tooltip title="Delete" placement="bottom-end">
                              <Button className="btnIcon">
                                <DeleteOutlineOutlinedIcon
                                  sx={{ cursor: "pointer" }}
                                  color="error"
                                  onClick={() => {
                                    deleteUser(row.id);
                                  }}
                                />
                              </Button>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow hover tabIndex={-1}>
                  <TableCell align={"center"} colSpan={6}>
                    <div>Sorry, no matching records found</div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
