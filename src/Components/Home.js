import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { Grid, Paper, Button, Typography } from "@material-ui/core";
import axios from "axios";
import DisplayList from "./DisplayList";
import CustomerForm from "./CostumerForm";

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
      field: "date"
    },
    { title: "Duration", field: "duration" },
    { title: "Activity", field: "activity" }
  ]);
  const [customers, setCustomers] = useState([]);
  const [trainings, setTrainigs] = useState([]);
  const [FormVisible, setFormVisible] = useState(false);
  const [customerRender, setCustomerRender] = useState({});
  const [customerRenderAction, setCustomerRenderAction] = useState("");
  const [customerTrainingsVisible, setCustomerTrainingsVisible] = useState(
    false
  );

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
        setCustomerRenderAction(action);
        setCustomerRender(null);
        setFormVisible(true);
        console.log("add " + customer);
        break;
      case "update":
        setCustomerRenderAction(action);
        setCustomerRender(customer);
        setFormVisible(true);
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
                    <Grid>
                      <Grid item>
                        <DisplayList
                          data={customers}
                          headers={customerHeaders}
                          collectCustomer={collectCustomer}
                        />
                      </Grid>
                      <Grid item>
                        <Paper className={classes.root}>
                          <Typography variant="h5" component="h3">
                            {FormVisible ? (
                              <CustomerForm
                                customer={customerRender}
                                action={customerRenderAction}
                                fetch={fetchData}
                                formVisible={setFormVisible}
                              />
                            ) : (
                              "Nothing to display"
                            )}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
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
        </Grid>
      </BrowserRouter>
    </div>
  );
};

export default Home;
