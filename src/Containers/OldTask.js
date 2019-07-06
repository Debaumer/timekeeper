import React, { Component } from "react";
import { connect } from "react-redux";
import CompleteTask from "../Components/CompleteTask";
import * as actions from "../store/actions/index";
import Day from "../Components/Day";

class OldTask extends Component {
  constructor() {
    super();
    this.state = {
      dates: []
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.onFetchTasks(this.props.token, this.props.userId);
    }, 1000);
  }

  render() {
    let output = <p>there's no tasks here, yet!</p>;
    let uniqueDates = [];
    if (!this.props.loading) {
      this.props.tasks.map(item => {
        var found = uniqueDates.find(function(arg) {
          return arg === item.date;
        });
        if (found) {
          return;
        } else {
          uniqueDates.push(item.date);
        }
      });

      uniqueDates.sort(function(a, b) {
        return b - a;
      });

      this.props.tasks.sort(function(a, b) {
        return b.date - a.date;
      });

      output = uniqueDates.map(item => {
        return (
          <Day date={item}>
            {this.props.tasks.map(task => {
              if (item === task.date) {
                return (
                  <CompleteTask
                    key={task.id}
                    taskName={task.name}
                    hours={task.hours}
                    minutes={task.minutes}
                    seconds={task.seconds}
                    date={task.date}
                  />
                );
              } else {
                return;
              }
            })}
          </Day>
        );
      });
    }
    return (
      <div className="OldTasks">
        <h1>Past Tasks</h1>
        <div>{output}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.task.tasks,
    loading: state.auth.loading,
    userId: state.auth.userId,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTasks: (token, userId) => dispatch(actions.fetchTasks(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OldTask);
