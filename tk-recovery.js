import React, {Component} from 'react';

//import {updateObject} from '../Utility/UpdateObject';
import Timer from '../Components/Timer';
import CompleteTasks from '../Components/CompleteTasks';
import CurrentTask from '../Components/CurrentTask';

class ClockContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
        show: false,
        id: null,
        name: 'task',
        timerOn: false,
        seconds: 0,
        minutes:0,
        hours:0,
      completeds: []
    }
  }

  componentDidUpdate () {
    this.convertMinutesHandler();
    this.convertHoursHandler();
  }

  interval = (arg) => {
    setInterval(()=>arg,1000)
  }

  startHandler = (e) => {
    e.preventDefault();
    const start = new Date();
    this.IncrementSeconds();
    this.setState((prevState, props) => {
      return {
        id: start,
        timerOn: true,
      }
    });
  }

  IncrementSeconds = () => {
    if(this.state.timerOn === false) {
      this.interval = setInterval(()=> {
        this.setState((prevState, props) => {
          return {
            seconds: prevState.seconds + 1,
          }
        })
      },1000)
    } else {
      console.log('do not start me twice');
    }
  }

  convertMinutesHandler = () => {
    if (this.state.seconds === 60 && this.state.seconds !== 0) {
      this.setState((prevState, props) => {
          return {
          seconds: prevState.seconds % 60,
          minutes: prevState.minutes + 1, }
      } );
    }
  }

  convertHoursHandler = () => {
    if (this.state.minutes === 60 && this.state.minutes !== 0){
      this.setState((prevState,pops) => {
        return {
            minutes: prevState.minutes % 60,
            hours: prevState.hours + 1 }
      } );
    }
  }

  toggleShowHandler = () => {
    this.setState((prevState, props) => {
      return {
        show: !prevState.show
      }
    });
  }

  nameChangeHandler = (event) => {
    let name = event.target.value
    this.setState((prevState,props) => {
      return {
        name: name
      }
    } );
  }

  completeTaskHandler = () => {
    const end = new Date();
    let savedState = new Object ({
      start: this.state.id,
      end: end,
      name: this.state.name,
      seconds: this.state.seconds,
      minutes: this.state.minutes,
      hours: this.state.hours,});

    this.setState((prevState,props) => {
      return {
        start: null,
        show: false,
        id: null,
        name: 'task',
        timerOn: false,
        seconds: 0,
        minutes:0,
        hours:0,
        completeds: prevState.completeds.concat(savedState)
      }
    });
    clearInterval(this.interval);
  }

  render() {

    let timer = 'nothing here'

    if (this.state.show === true) {
      timer = <Timer
        clicked={this.startHandler}
        hours={this.state.hours}
        minutes={this.state.minutes}
        seconds={this.state.seconds}
        submitted={this.startHandler}
        changed={this.nameChangeHandler} />
    }
  //  else if(this.state.isOn === true) {
    // don't display the submit  once the timer has
    //started

    let comTasks = (
      <div>
        {this.state.completeds.map(item => {
          return <CompleteTasks
          id={item.start}
          end={item.end}
          taskName={item.name}
          hours={item.hours}
          minutes={item.minutes}
          seconds={item.seconds} />
        })}
      </div>
    )
    return (
      <div className="ClockContainer">
        <button
          style={{marginBottom: '20px'}}
          onClick={this.toggleShowHandler}>
          {this.state.open===true ? 'task complete!' : 'create new Task'}</button>
          {timer}
        <CurrentTask
          id={this.state.id}
          hours={this.state.hours}
          minutes={this.state.minutes}
          seconds={this.state.seconds}
          taskName={this.state.name}
          clicked={this.completeTaskHandler} />
        {comTasks}

      </div>
    );
  }
}

export default ClockContainer;

import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav';


import ClockContainer from './Containers/ClockContainer';

class App extends Component {
  state = {
  }

  render() {
    const style = {
      border: '1px solid',
      boxShadow: '5px 5px 7px 2px',
      padding: 'none'
    }

    return (
      <div className="App">
        <Nav/>
        <h1 style={style}>
          TimeKeeper
        </h1>
        <h2>Create New Task</h2>
        <ClockContainer/>
      </div>
    );
  }
}

export default App;

import React from 'react';

const nav = (props) => {

  const styleA = {
    paddingLeft: '20px'
  }

  const styleNav = {
    paddingTop: '5px',
    boxShadow: '5px 10px'
  }

  return(
    <div>
      <nav style={styleNav}>
        <a style={styleA} href="/">Login</a>
        <a style={styleA} href="/">Today's To Do's</a>
        <a style={styleA} href="/">Analytics</a>
        <a style={styleA} href="/">Goals</a>
      </nav>
    </div>

  )
}

export default nav;

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

import React from 'react';

const currentTask = (props) => {

  let style = {

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

import React from 'react';

const completeTasks = (props) => {

  return (
    <div>
      <p>{props.taskName}</p>
      <p>{props.hours}:{props.minutes}:{props.seconds}</p>
      <p>{props.children}</p>
    </div>
  )
}

export default completeTasks;

timekeeper/src/trash/**


export const updateObject = (oldObject, updatedValues) => {
  return {...oldObject, ...updatedValues}};
