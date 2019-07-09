import React from "react";
import classes from "./Calendar.css";

const year = props => {
  return (
    <div
      style={{ marginLeft: props.indent }}
      year={props.year}
      className={classes.calendarPeriod}
    >
      <h1 onClick={props.toggle}>{props.year}</h1>
      <div id={props.year} className={props.classes}>
        {props.children}
      </div>
    </div>
  );
};

export default year;
