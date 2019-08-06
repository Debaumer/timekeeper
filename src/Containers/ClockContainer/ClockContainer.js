import React, { Component } from "react";
import { connect } from "react-redux";
import Timer from "../../Components/Timer";
import CompleteTask from "../../Components/CompleteTask";
import CurrentTask from "../../Components/CurrentTask";
import * as actions from "../../store/actions/index";
import classes from "./ClockContainer.css";

class ClockContainer extends Component {
  constructor() {
    super();
    this.state = {
      today: this.getToday(),
      show: false,
      end: null,
      name: "New Task",
      timerOn: false,
      seconds: 0,
      minutes: 0,
      hours: 0,
      complete: this.getStorage()
    };
  }

  componentDidUpdate() {
    this.convertMinutesHandler();
    this.convertHoursHandler();
    if (!this.props.token) sessionStorage.clear();
  }

  componentDidMount() {
    this.newDayClear();
    this.setState((prevState, props) => {
      return {
        complete: this.getStorage()
      };
    });
    this.props.onSetToday(this.getToday());
  }

  startHandler = e => {
    e.preventDefault();
    const start = new Date();
    this.IncrementSeconds();
    this.setState((prevState, props) => {
      return {
        id: start,
        timerOn: true
      };
    });
  };

  IncrementSeconds = () => {
    if (this.state.timerOn === false) {
      this.interval = setInterval(() => {
        this.setState((prevState, props) => {
          return {
            seconds: prevState.seconds + 1
          };
        });
      }, 1000);
    } else {
      console.log("do not start me twice");
    }
  };

  getToday = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    dd = dd.toString();
    mm = mm.toString();
    yy = yy.toString();

    const date = yy + mm + dd;
    return date;
  };

  //just for testing
  getWrongToday = () => {
    const today = "03";
    return today;
  };

  convertMinutesHandler = () => {
    if (this.state.seconds === 60 && this.state.seconds !== 0) {
      this.setState((prevState, props) => {
        return {
          seconds: prevState.seconds % 60,
          minutes: prevState.minutes + 1
        };
      });
    }
  };

  newDayClear = () => {
    const items = this.getStorage();
    sessionStorage.removeItem(items);
    items.map(item => {
      if (this.state.today !== item.date) {
        sessionStorage.clear();
      }
      return null;
    });
  };

  convertHoursHandler = () => {
    if (this.state.minutes === 60 && this.state.minutes !== 0) {
      this.setState((prevState, pops) => {
        return {
          minutes: prevState.minutes % 60,
          hours: prevState.hours + 1
        };
      });
    }
  };

  toggleShowHandler = () => {
    this.setState((prevState, props) => {
      return {
        show: !prevState.show
      };
    });
  };

  getStorage = () => {
    let keys = [];
    for (let i = 0; i <= sessionStorage.length - 1; i++) {
      let key = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
      keys = keys.concat(key);
    }
    keys.reverse();
    return keys;
  };

  nameChangeHandler = event => {
    let name = event.target.value;
    this.setState((prevState, props) => {
      return {
        name: name
      };
    });
  };

  completeTaskHandler = () => {
    if (
      this.state.seconds === 0 &&
      this.state.minutes === 0 &&
      this.state.hours === 0
    ) {
      alert("Please Provide a name");
    } else {
      const end = new Date();
      let finishedTask = Object({
        start: this.state.id,
        end: end,
        date: this.getToday(),
        userId: this.props.userId,
        name: this.state.name,
        token: this.props.token,
        seconds: this.state.seconds,
        minutes: this.state.minutes,
        hours: this.state.hours
      });
      sessionStorage.setItem(finishedTask.start, JSON.stringify(finishedTask));

      this.setState((prevState, props) => {
        return {
          start: null,
          show: false,
          end: null,
          name: "task",
          timerOn: false,
          seconds: 0,
          minutes: 0,
          hours: 0,
          complete: this.getStorage()
        };
      });
      //axios.post goes here
      clearInterval(this.interval);
      this.props.onPostTasks(
        this.getToday(),
        finishedTask,
        this.props.token,
        this.props.userId
      );
    }
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onComplete(this.state.complete);
  };

  render() {
    let timer = null;

    if (this.state.show === true) {
      timer = (
        <Timer
          clicked={this.startHandler}
          hours={this.state.hours}
          minutes={this.state.minutes}
          seconds={this.state.seconds}
          submitted={this.startHandler}
          changed={this.nameChangeHandler}
        />
      );
    }
    let warningMessage = null;
    if (!this.props.userId)
      warningMessage = (
        <p>This won't save to the server if you don't log in, numbnuts.</p>
      );

    let comTasks = (
      <div>
        {this.state.complete.map(item => {
          return (
            <CompleteTask
              id={item.start}
              key={item.start}
              end={item.end}
              taskName={item.name}
              hours={item.hours}
              minutes={item.minutes}
              seconds={item.seconds}
            />
          );
        })}
      </div>
    );

    return (
      <div className={classes.ClockContainer}>
        <button
          style={{ marginBottom: "20px" }}
          onClick={this.toggleShowHandler}
        >
          {this.state.open === true ? "task complete!" : "create new Task"}
        </button>
        {timer}
        <CurrentTask
          id={this.state.id}
          hours={this.state.hours}
          minutes={this.state.minutes}
          seconds={this.state.seconds}
          taskName={this.state.name}
          clicked={this.completeTaskHandler}
        />
        {warningMessage}
        {comTasks}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    tasks: state.task.tasks,
    today: state.task.today
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPostTasks: (today, task, token, userId) =>
      dispatch(actions.postTasks(today, task, token, userId)),
    onSetToday: today => dispatch(actions.setToday(today))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClockContainer);
