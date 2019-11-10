import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import { Paper } from "@material-ui/core";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

const useStyles = makeStyles({});

const Calendar = props => {
  const classes = useStyles();
  const [trainings, setTrainings] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    let events = [];
    axios
      .get("https://customerrest.herokuapp.com/api/trainings")
      .then(response => {
        let data = response.data.content;
        data.forEach(element => {
          let start = new Date(element.date);
          let end = new Date(element.date);
          end.setHours(
            end.getHours(),
            end.getMinutes() + element.duration,
            0,
            0
          );
          events.push({
            title: element.activity,
            start: start,
            end: end
          });
        });

        setTrainings(events);
      });
  }, []);
  console.log(trainings);
  return (
    <Paper>
      <FullCalendar
        plugins={[dayGridPlugin]}
        header={{ center: "dayGridMonth,dayGridWeek,dayGridDay" }}
        events={trainings}
      />
    </Paper>
  );
};

Calendar.propTypes = {};

export default Calendar;
