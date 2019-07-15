import React from "react";
import classes from "./Calendar.css";

const month = props => {
  return (
    <div
      style={{ marginLeft: props.indent }}
      month={props.month}
      className={classes.calendarPeriod}
    >
      <h1 onClick={props.toggle}>{props.monthString}</h1>
      <div id={props.month} className={props.classes}>
        {props.children}
      </div>
    </div>
  );
};

export default month;
