import React from 'react';

const timer = (props) => {


  return (
      <div>
        <div>
        <form>
          <input
            type="text"
            name="fname"
            placeholder="what are you doing?"
            onChange={props.changed}
            value={props.taskName} >
          </input>
          <button onClick={props.submitted}>
            Start Task</button>
        </form>
        </div>
        <p>{props.taskName}</p>
      </div>
  )
}

export default timer;
