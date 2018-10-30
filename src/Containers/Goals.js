import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import Button from '../Components/Shared/Button/Button';
import classes from './Goals.css';

class Goals extends Component {
  state ={

  }

  render() {

    return (
    <div className={classes.Goals}>
      <h1>Goals</h1>
      <Button btnType="Success">Add New Goal</Button>
    </div>
    );
  }
}

export default Goals;
