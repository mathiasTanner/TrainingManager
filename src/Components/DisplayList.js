import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

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
          sorting: true
        }}
        actions={[
          {
            icon: "update",
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
        options={{
          actionsColumnIndex: -1
        }}
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
          <Button onClick={handleClose} color="primary">
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
