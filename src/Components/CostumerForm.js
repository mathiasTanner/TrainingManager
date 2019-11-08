import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  FormControl,
  FormGroup,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import axios from "axios";

const useStyles = makeStyles({
  textField: {
    width: 200
  },
  button: {
    margin: 5
  },
  alert: {
    color: "red"
  }
});

const emptyCustomer = {
  firstname: "",
  lastname: "",
  streetaddress: "",
  postcode: "",
  email: "",
  city: "",
  phone: ""
};

const CustomerForm = props => {
  const classes = useStyles();
  const [changedCustomer, setChangedCustomer] = useState(emptyCustomer);
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);

  useEffect(() => {
    setChangedCustomer(
      props.customer !== null ? props.customer : emptyCustomer
    );
  }, [props.customer]);

  const handleChange = event => {
    setChangedCustomer({
      ...changedCustomer,
      [event.target.id]: event.target.value
    });
  };

  const handleClickOpen = (rowData, event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmCancel = () => {
    setChangedCustomer(props.action === "add" ? emptyCustomer : props.customer);
    handleClose();
  };

  return (
    <Paper>
      <FormControl component="fieldset">
        <FormGroup>
          <Grid container direction="column">
            <Typography variant="h4">
              {props.action === "add" ? "Add " : "Update "} a customer:
            </Typography>
            <Grid item>
              <TextField
                id="firstname"
                className={classes.textField}
                label="First name"
                value={changedCustomer.firstname}
                margin="normal"
                variant="outlined"
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="lastname"
                className={classes.textField}
                label="Last Name"
                value={changedCustomer.lastname}
                margin="normal"
                variant="outlined"
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="streetaddress"
                className={classes.textField}
                label="Address"
                value={changedCustomer.streetaddress}
                margin="normal"
                variant="outlined"
                required
                onChange={handleChange}
              />
              <Grid item>
                <TextField
                  id="postcode"
                  className={classes.textField}
                  label="Post Code"
                  value={changedCustomer.postcode}
                  margin="normal"
                  variant="outlined"
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="city"
                  className={classes.textField}
                  label="City"
                  value={changedCustomer.city}
                  margin="normal"
                  variant="outlined"
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="email"
                  className={classes.textField}
                  label="E-mail"
                  value={changedCustomer.email}
                  margin="normal"
                  variant="outlined"
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="phone"
                  className={classes.textField}
                  label="Phone"
                  value={changedCustomer.phone}
                  margin="normal"
                  variant="outlined"
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                {alertOpen ? (
                  <Typography variant="h6" className={classes.alert}>
                    All fields must be filled!
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={_ => {
                    handleClickOpen();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={_ => {
                    if (
                      changedCustomer.firstname !== "" &&
                      changedCustomer.lastname !== "" &&
                      changedCustomer.streetaddress !== "" &&
                      changedCustomer.postcode !== "" &&
                      changedCustomer.city !== "" &&
                      changedCustomer.email !== "" &&
                      changedCustomer.phone !== ""
                    ) {
                      props.action === "add"
                        ? axios
                            .post(
                              "https://customerrest.herokuapp.com/api/customers",
                              changedCustomer
                            )
                            .then(_ => {
                              props.fetch();
                              props.formVisible(false);
                            })
                        : axios
                            .put(changedCustomer.links[0].href, changedCustomer)
                            .then(_ => {
                              props.fetch();
                              props.formVisible(false);
                            });
                    } else {
                      setAlertOpen(true);
                    }
                  }}
                >
                  {props.action === "add" ? "Add" : "Update"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </FormGroup>
      </FormControl>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm cancel"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to discard changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={confirmCancel} color="primary" autoFocus>
            yes
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

CustomerForm.propTypes = {
  customer: PropTypes.object,
  action: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
  formVisible: PropTypes.func.isRequired
};

export default CustomerForm;
