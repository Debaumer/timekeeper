import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import CompleteTask from '../Components/CompleteTask';
import * as actions from '../store/actions/index';

class OldTask extends Component {

  componentDidMount() {
    setTimeout(() => {this.props.onFetchTasks(this.props.token, this.props.userId)}, 1000)
  }

  render() {
    let output = <p>there's no tasks here, yet!</p>
    if(!this.props.loading) {
      output = this.props.tasks.map(task => (
        <CompleteTask
          key={task.id}
          taskName={task.name}
          hours={task.hours}
          minutes={task.minutes}
          seconds={task.seconds}
          date={task.date}
        />
      ));
    }
    //maybe log dategroup or try to put it into output outPutItems
    return (
      <div className="OldTasks">
        <h1>Past Tasks</h1>
        <div>
        {output}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.task.tasks,
    loading: state.auth.loading,
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTasks: (token, userId) => dispatch( actions.fetchTasks(token,userId) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(OldTask);
