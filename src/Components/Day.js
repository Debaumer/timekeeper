import React from "react";

const day = props => {
  var date =
    props.date.slice(6, 8) +
    "." +
    props.date.slice(4, 6) +
    "." +
    props.date.slice(0, 4);

  return (
    <div>
      <h1>{date}</h1>
      {props.children}
    </div>
  );
};

export default day;
