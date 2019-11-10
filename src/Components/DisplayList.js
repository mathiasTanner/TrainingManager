import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import PropTypes from "prop-types";
import { Paper } from "@material-ui/core";
import axios from "axios";
import TrainingList from "./TrainingList";

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
  const [trainingData, setTrainingData] = useState([]);
  const [trainigListVisible, setTrainingListVisible] = useState(false);
  const [rowInfo, setRowInfos] = useState({});

  let moment = require("moment");

  const fetchTrainings = event => {
    setTrainingListVisible(false);
    axios
      .get(event.links[2].href)
      .then(response => {
        setTrainingData(response.data.content);
      })
      .then(setTrainingListVisible(true));
  };

  return (
    <Paper>
      <MaterialTable
        title="Customer List"
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
                axios
                  .post(
                    "https://customerrest.herokuapp.com/api/customers",
                    newData
                  )
                  .then(_ => {
                    props.fetch();
                  });
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                axios.put(newData.links[0].href, newData).then(_ => {
                  props.fetch();
                });
                resolve();
              }, 1000);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                axios.delete(oldData.links[0].href).then(_ => {
                  props.fetch();
                });
                resolve();
              }, 1000);
            })
        }}
        onRowClick={(rowData, event) => {
          setRowInfos(event);
          fetchTrainings(event);
        }}
      />
      {trainigListVisible ? (
        <TrainingList
          data={trainingData}
          headers={[
            {
              title: "Date",
              field: "date",
              type: "date",
              render: rowData =>
                moment(rowData.date).format("MMMM Do YYYY, hh:mm a")
            },
            { title: "Duration", field: "duration", type: "numeric" },
            { title: "Activity", field: "activity" }
          ]}
          fetch={fetchTrainings}
          rowInfo={rowInfo}
        />
      ) : (
        ""
      )}
    </Paper>
  );
};

DisplayList.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  fetch: PropTypes.func.isRequired
};

export default DisplayList;
