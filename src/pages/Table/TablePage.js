import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";

const TablePage = () => {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({
    id: "",
    lastName: "",
    firstName: "",
    age: "",
  });
  const [rows, setRows] = React.useState([
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 32 },
    { id: 6, lastName: "Melisandre", firstName: "tata", age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ]);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "age", headerName: "Age", width: 130 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
          api
            .getAllColumns()
            .filter((user) => user.field !== "__check__" && !!user)
            .forEach(
              (user) =>
                (thisRow[user.field] = params.getValue(params.id, user.field))
            );
          console.log(thisRow);
          const filterArray = rows.filter((row) => {
            return row.id != thisRow.id;
          });
          setRows(filterArray);
        };

        return (
          <Button onClick={onClick} variant="contained" color="secondary">
            Delete
          </Button>
        );
      },
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handelChange = (e) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
    console.log(user);
  };

  const handleSubmit = () => {
    if (user.firstName != "" && user.lastName != "" && user.id != "") {
      setRows([...rows, user]);
      console.log("user added successfully");
    }
  };
  return (
    <>
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Create
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="id"
              label="ID"
              type="number"
              fullWidth
              value={user.id}
              onChange={handelChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              fullWidth
              value={user.name}
              onChange={handelChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              fullWidth
              value={user.lastName}
              onChange={handelChange}
            />

            <TextField
              autoFocus
              margin="dense"
              id="age"
              label="Age"
              type="number"
              fullWidth
              value={user.age}
              onChange={handelChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleClose();
                handleSubmit();
              }}
              variant="contained"
              color="secondary"
            >
              ADD
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div
        style={{
          height: 400,
          width: "100%",
          backgroundColor: "#fff",
          marginTop: "20px",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </>
  );
};

export default TablePage;
