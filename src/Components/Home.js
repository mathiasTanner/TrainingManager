import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { Grid, Paper, Button, Typography } from "@material-ui/core";
import axios from "axios";
import DisplayList from "./DisplayList";

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
    { title: "E-mail", field: "email" },
    {
      title: "Phone",
      field: "phone"
    }
  ]);
  const [trainingHeader, setTrainingHeaders] = useState([
    {
      title: "Date",
      field: "date"
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

  const collectCustomer = (customer, action) => {
    switch (action) {
      case "delete":
        axios.delete(customer.links[0].href).then(_ => {
          fetchData();
        });

        break;
      case "add":
        console.log("add " + customer);
        break;
      case "update":
        console.log("update: ");
        console.log(customer);

        break;
      case "display":
        console.log("display " + customer);
        break;
      default:
        break;
    }
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
                to="/trainings"
              >
                Trainings
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Switch>
                <Route
                  path="/customers"
                  render={() => (
                    <DisplayList
                      data={customers}
                      headers={customerHeaders}
                      collectCustomer={collectCustomer}
                    />
                  )}
                />
                <Route
                  path="/trainings"
                  render={() => (
                    <DisplayList
                      data={trainings}
                      headers={trainingHeader}
                      collectCustomer={collectCustomer}
                    />
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
          <Grid item xs={12}>
            <Paper className={classes.root}>
              <Typography variant="h5" component="h3">
                display detail area.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </BrowserRouter>
    </div>
  );
};

export default Home;
