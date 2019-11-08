import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import PropTypes from "prop-types";
import {
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

const DisplayList = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [deleteCustomer, setDeleteCustomer] = React.useState({});

  const handleClickOpen = (rowData, event) => {
    setDeleteCustomer(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    props.collectCustomer(deleteCustomer, "delete");
    handleClose();
  };

  return (
    <div>
      <MaterialTable
        title="Customer List"
        columns={props.headers}
        data={props.data}
        options={{
          search: true,
          sorting: true,
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: "details",
            tooltip: "Show Details",
            onClick: (event, rowData) =>
              props.collectCustomer(rowData, "display")
          },
          {
            icon: "edit",
            tooltip: "Update User",
            onClick: (event, rowData) =>
              props.collectCustomer(rowData, "update")
          },
          {
            icon: "add",
            tooltip: "Add User",
            isFreeAction: true,
            onClick: event => props.collectCustomer(null, "add")
          },
          rowData => ({
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, rowData) => handleClickOpen(event, rowData)
          })
        ]}
        detailPanel={[
          {
            tooltip: "Show Name",
            render: rowData => {
              return (
                <Paper>
                  <Typography>{rowData.firstname}</Typography>
                </Paper>
              );
            }
          }
        ]}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {deleteCustomer.firstname}{" "}
            {deleteCustomer.lastname} definitively?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            No
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DisplayList.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  collectCustomer: PropTypes.func.isRequired
};

export default DisplayList;
