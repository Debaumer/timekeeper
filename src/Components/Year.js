import React from "react";
import classes from "./Calendar.css";

const year = props => {
  return (
    <div year={props.year}>
      <div>
        <div onClick={props.toggle} className={classes.day}>
          <h1>{props.year}</h1>
        </div>
        <div id={props.date} date={props.date} className={props.classes}>
          <div>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default year;