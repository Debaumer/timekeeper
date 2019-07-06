import React from "react";
import CompleteTask from "./CompleteTask";

const day = props => {
  var date =
    props.date.slice(6, 8) +
    "." +
    props.date.slice(4, 6) +
    "." +
    props.date.slice(0, 4);

  return (
    <div date={props.date}>
      <h1>{date}</h1>
      <div>{props.children}</div>
    </div>
  );
};

export default day;
