import React from 'react';

import classes from './CompleteTask.css';

const completeTasks = (props) => {


  return (
    <div className={classes.CompleteTask}>
      <h4>Task Name</h4>
      <p>{props.taskName}</p>
      <h4>Duration</h4>
      <p>{props.hours < 10 ? '0' : ''}{props.hours}:
      {props.minutes < 10 ? '0' : ''}{props.minutes}:
      {props.seconds < 10 ? '0' : ''}{props.seconds}</p>
      {props.old ? <div><p>Start:{props.start}</p>
        <p>End:{props.end}</p></div> : null }
      <h4>Date</h4>
      <p>{props.date}</p>
      {props.children}
    </div>
  )
}

export default completeTasks;
