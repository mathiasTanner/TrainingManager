import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import PropTypes from "prop-types";
import { Paper } from "@material-ui/core";
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

  return (
    <MaterialTable
      title="Training List"
      columns={props.headers}
      data={props.data}
      options={{
        search: true,
        sorting: true,
        actionsColumnIndex: -1
      }}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              let training = {
                ...newData,
                customer: props.rowInfo.links[0].href
              };

              axios
                .post(
                  "https://customerrest.herokuapp.com/api/trainings",
                  training
                )
                .then(_ => {
                  props.fetch(props.rowInfo);
                });
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              axios.put(newData.links[0].href, newData).then(_ => {
                console.log(props.rowInfo.links[2].href);

                props.fetch(props.rowInfo);
              });
              resolve();
            }, 1000);
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              axios.delete(oldData.links[0].href).then(_ => {
                props.fetch(props.rowInfo);
              });
              resolve();
            }, 1000);
          })
      }}
    />
  );
};

DisplayList.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  fetch: PropTypes.func.isRequired,
  rowInfo: PropTypes.object
};

export default DisplayList;
