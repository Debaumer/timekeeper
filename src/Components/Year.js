import React from "react";
import classes from "./Calendar.css";

const year = props => {
  return (
    <div year={props.year}>
      <div>
        <div onClick={props.toggle} className={classes.calendarPeriod}>
          <h1>{props.year}</h1>
        </div>
        <div id={props.year} date={props.year} className={props.classes}>
          <div>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default year;
