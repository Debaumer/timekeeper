import React from "react";
import classes from "./Calendar.css";

const day = props => {
  var date =
    props.date.slice(6, 8) +
    "." +
    props.date.slice(4, 6) +
    "." +
    props.date.slice(0, 4);

  return (
    <div onClick={props.toggle} className={classes.calendarPeriod}>
      <h1>{date}</h1>
      <div id={props.date} date={props.date} className={props.classes}>
        {props.children}
      </div>
    </div>
  );
};

export default day;
