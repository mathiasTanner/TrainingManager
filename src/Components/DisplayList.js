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
import axios from "axios";

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
    <MaterialTable
      title="Customer List"
      columns={props.headers}
      data={props.data}
      options={{
        search: true,
        sorting: true,
        actionsColumnIndex: -1
      }}
      detailPanel={[
        {
          tooltip: "Show trainings",
          render: rowData => {
            let data = null;
            axios.get(rowData.links[2].href).then(response => {
              data = response.data.content;
              return (
                <Paper>
                  <DisplayList
                    data={data}
                    headers={[
                      {
                        title: "Date",
                        field: "date"
                      },
                      { title: "Duration", field: "duration" },
                      { title: "Activity", field: "activity" }
                    ]}
                  />
                </Paper>
              );
            });
          }
        }
      ]}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                axios
                  .post(
                    "https://customerrest.herokuapp.com/api/customers",
                    newData
                  )
                  .then(_ => {
                    props.fetch();
                  });
              }
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                axios.put(newData.links[0].href, newData).then(_ => {
                  props.fetch();
                });
              }
              resolve();
            }, 1000);
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                axios.delete(oldData.links[0].href).then(_ => {
                  props.fetch();
                });
              }
              resolve();
            }, 1000);
          })
      }}
      onRowClick={togglePanel => togglePanel()}
    />
  );
};

DisplayList.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  fetch: PropTypes.func.isRequired
};

export default DisplayList;
