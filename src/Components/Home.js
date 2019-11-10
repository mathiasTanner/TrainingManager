import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { Grid, Paper, Button, Typography } from "@material-ui/core";
import axios from "axios";
import DisplayList from "./DisplayList";
import TrainingList from "./TrainingList";

const customerUrl = "https://customerrest.herokuapp.com/api/customers";
const trainigUrl = "https://customerrest.herokuapp.com/api/trainings";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const Home = () => {
  let moment = require("moment");
  const [customerHeaders, setCustomerHeaders] = useState([
    {
      title: "First Name",
      field: "firstname"
    },
    { title: "Last Name", field: "lastname" },
    { title: "Address", field: "streetaddress" },
    {
      title: "Post Code",
      field: "postcode",
      type: "numeric"
    },
    { title: "City", field: "city" },
    { title: "E-mail", field: "email" },
    {
      title: "Phone",
      field: "phone"
    }
  ]);
  const [trainingHeader, setTrainingHeaders] = useState([
    {
      title: "Date",
      field: "date",
      type: "date",
      render: rowData => moment(rowData.date).format("MMMM Do YYYY, hh:mm a")
    },
    { title: "Duration", field: "duration" },
    { title: "Activity", field: "activity" }
  ]);
  const [customers, setCustomers] = useState([]);
  const [trainings, setTrainigs] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(customerUrl).then(response => {
      setCustomers(response.data.content);
    });
    axios.get(trainigUrl).then(response => {
      setTrainigs(response.data.content);
    });
  };

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Button
                color="primary"
                className={classes.button}
                component={Link}
                to="/customers"
              >
                Customers
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Button
                color="primary"
                className={classes.button}
                component={Link}
                to="/calendar"
              >
                Calendar
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Switch>
                <Route
                  path="/customers"
                  render={() => (
                    <Grid>
                      <Grid item>
                        <DisplayList
                          data={customers}
                          headers={customerHeaders}
                          fetch={fetchData}
                        />
                      </Grid>
                    </Grid>
                  )}
                />
                <Route
                  path="/calendar"
                  render={() => (
                    <Typography variant="h2">to come soon!</Typography>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={() => <h1>Choose what you want to display</h1>}
                />
                <Route render={() => <h1>page not found</h1>} />
              </Switch>
            </Paper>
          </Grid>
        </Grid>
      </BrowserRouter>
    </div>
  );
};

export default Home;
