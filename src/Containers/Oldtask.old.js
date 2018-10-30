import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from '../Utility/axios-tasks';
import Auxiliary from '../hoc/auxiliary';
import CompleteTask from '../Components/CompleteTask';

class OldTask extends Component {
  constructor() {
    super();
    this.state = {
      taskList: [],
      loading: true,
    }
  }

  componentDidMount() {
    axios.get('./tasks.json')
      .then(response => {
        const fetchedTasks = [];
        for (let date in response.data) {
          fetchedTasks.push({
            ...response.data[date],
            date: date,
          });
          for (let item in response.data[date]) {
            fetchedTasks.push({
              ...response.data[date[item]],
              id: item
            })
          }
        }
        this.setState((prevState, props) => {
          return {
            taskList: fetchedTasks,
            loading: false
          }
        })
      })
      .catch(error => console.log(error));
  }

  collectTasks() {
    const oldTasks = new Array(this.state.taskList);
  }

  componentDidUpdate() {
    this.collectTasks()
  }

  render() {
    //maybe log dategroup or try to put it into output outPutItems
    return (
      <div className="OldTasks">
        <h1>Past Tasks</h1>
        <div>
          {this.state.taskList.map((array, index) => (
            <CompleteTask
              key={array.date}
              taskName={array.date}
            />
          ) )
        }
        <CompleteTask
          taskName='-LMgzaEYe0tcCjpxOuPU'
          hours='2'
          minutes='37'
          seconds='33'

        />
        </div>
      </div>
    );
  }
}

export default OldTask;
