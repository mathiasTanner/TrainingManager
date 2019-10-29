import React, { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import MaterialTable from "material-table";
import Search from "@material-ui/icons/Search";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
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

  return (
    <MaterialTable
      icons={tableIcons}
      title="Customer List"
      columns={props.headers}
      data={props.data}
      options={{
        search: true,
        sorting: true
      }}
    />
  );
};

DisplayList.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired
};

export default DisplayList;
