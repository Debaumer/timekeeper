import React from "react";
import classes from "./Calendar.css";

const month = props => {
  return (
    <div year={props.month}>
      <div>
        <div onClick={props.toggle} className={classes.calendarPeriod}>
          <h1>{props.month}</h1>
        </div>
        <div id={props.month} year={props.month} className={props.classes}>
          <div>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default month;
