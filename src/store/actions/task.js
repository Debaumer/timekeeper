import * as actionTypes from "./actionTypes";
import axios from "../../Utility/axios-tasks";

export const fetchTasks = (token, userId) => {
  return dispatch => {
    dispatch(fetchTasksStart(token, userId));
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("./tasks.json" + queryParams)
      .then(response => {
        const fetchedTasks = [];
        for (let key in response.data) {
          fetchedTasks.push({
            ...response.data[key],
            id: key
          });
        }
        dispatch(fetchTasksSuccess(fetchedTasks));
      })
      .catch(err => {
        dispatch(fetchTasksFail(err));
      });
  };
};

export const fetchTasksTimeFrame = (token, userId, timeFrame) => {
  return dispatch => {
    dispatch(fetchTasksStart(token, userId));
    const queryParams =
      "?auth=" + token + `&orderBy="userId"&equalTo="` + userId + `"`;
    //axios.get("./tasks.json" + queryParams);
  };
};

export const fetchTasksSuccess = tasks => {
  return {
    type: actionTypes.FETCH_TASKS_SUCCESS,
    tasks: tasks
  };
};

export const setToday = today => {
  return {
    type: actionTypes.SET_TODAY,
    today: today
  };
};

export const fetchTasksFail = error => {
  return {
    type: actionTypes.FETCH_TASKS_FAIL,
    error: error
  };
};

export const fetchTasksStart = () => {
  return {
    type: actionTypes.FETCH_TASKS_START
  };
};

export const postTaskStart = () => {
  return {
    type: actionTypes.POST_TASK_START
  };
};

export const postTaskFail = error => {
  return {
    type: actionTypes.POST_TASK_FAIL,
    error: error
  };
};

export const postTaskSuccess = tasks => {
  return {
    type: actionTypes.POST_TASK_SUCCESS,
    tasks: tasks
  };
};

export const postTasks = (today, task, token, userId) => {
  return dispatch => {
    axios
      .post("/tasks.json?auth=" + token, task)
      .then(response => console.log())
      .catch(error => console.log(error));
  };
};
