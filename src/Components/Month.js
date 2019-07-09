import React from "react";
import classes from "./Calendar.css";

const month = props => {
  return (
    <div month={props.month} className={classes.calendarPeriod}>
      <h1 onClick={props.toggle}>{props.month}</h1>
      <div id={props.month} className={props.classes}>
        {props.children}
      </div>
    </div>
  );
};

export default month;
