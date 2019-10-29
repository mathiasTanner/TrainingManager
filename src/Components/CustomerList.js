import React, { useState, useEffect, forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import MaterialTable from "material-table";
import Search from "@material-ui/icons/Search";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";

const url = "https://customerrest.herokuapp.com/api/customers";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

const CustomerList = () => {
  const classes = useStyles();

  const [headers, setHeaders] = useState([
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

  const [customers, setCustomers] = useState([]);

  const tableIcons = {
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    ))
  };

  useEffect(() => {
    axios.get(url).then(response => {
      setCustomers(response.data.content);
    });
  }, []);

  return (
    <MaterialTable
      icons={tableIcons}
      title="Customer List"
      columns={headers}
      data={customers}
      options={{
        search: true,
        sorting: true
      }}
    />
  );
};

export default CustomerList;
