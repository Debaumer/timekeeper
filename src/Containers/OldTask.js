import React, { Component } from "react";
import { connect } from "react-redux";
import CompleteTask from "../Components/CompleteTask";
import * as actions from "../store/actions/index";
import Day from "../Components/Day";
import Month from "../Components/Month";
import Year from "../Components/Year";
import classes from "../Components/Calendar.css";

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

  toggleDropDown(e, date) {
    console.log(date);
    console.log(e.currentTarget);
    var container = document.getElementById(date);
    if (container.classList.contains(classes.hiddenChildren)) {
      console.log("the class exists");
      container.classList.remove(classes.hiddenChildren);
    } else {
      container.classList.add(classes.hiddenChildren);
      console.log("the class does not exist");
    }
    console.log(container);
  }

  render() {
    let output = <p>there's no tasks here, yet!</p>;
    let uniqueDates = [];
    let uniqueYears = [];
    let uniqueMonths = [];

    if (!this.props.loading) {
      this.props.tasks.map(item => {
        var year = item.date.slice(0, 4);

        var month = item.date.slice(4, 6);

        var foundDate = uniqueDates.find(function(arg) {
          return arg === item.date;
        });

        var foundMonth = uniqueMonths.find(function(arg) {
          return arg === `${month}-${year}`;
        });

        var foundYear = uniqueYears.find(function(arg) {
          return arg === year;
        });

        if (foundYear) {
        } else {
          uniqueYears.push(year);
        }

        if (foundMonth) {
        } else {
          uniqueMonths.push(`${month}-${year}`);
        }

        if (foundDate) {
          //return
        } else {
          uniqueDates.push(item.date);
        }
      });

      uniqueDates.sort(function(a, b) {
        return b - a;
      });
      uniqueMonths.sort(function(a, b) {
        return b - a;
      });
      uniqueYears.sort(function(a, b) {
        return b - a;
      });

      this.props.tasks.sort(function(a, b) {
        return b.date - a.date;
      });

      output = uniqueDates.map(item => {
        return (
          <Day
            classes={classes.hiddenChildren}
            date={item}
            toggle={e => this.toggleDropDown(e, item)}
          >
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
