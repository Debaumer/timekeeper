import React from 'react';

const currentTask = (props) => {

  let style = {
    margin:'auto',
  }

  if (props.show) {
    style = {display:'none'}
  }

  return(
    <div style={style}>
      {props.show}
      <p>{props.taskName}</p>
      <p>{props.hours < 10 ? '0' : ''}{props.hours}:
      {props.minutes < 10 ? '0' : ''}{props.minutes}:
      {props.seconds < 10 ? '0' : ''}{props.seconds}</p>
      <button onClick={props.clicked}>Complete Task</button>
    </div>
  )
}

export default currentTask;
