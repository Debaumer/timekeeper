import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../Utility/UpdateObject';

const initialState = {
    tasks: [],
    loading: false,
    today: null,
};

const fetchTasksStart = (state, action) => {
  return updateObject(state, {loading: true} );
}

const setToday = (state, action) => {
  return updateObject(state,{
    today: action.today
  });
}

const fetchTasksSuccess = (state, action) => {
  return updateObject(state, {
    tasks: action.tasks,
    loading: false
  } );
}

const fetchTasksFail =(state, action) => {
  return updateObject(state, {loading: false});
}

const postTaskSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    tasks: action.tasks
  } );
}

const postTaskFail = (state, action) => {
  return updateObject(state, {loading: false} );
}

const postTaskStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    today: action.today
    } );
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case actionTypes.FETCH_TASKS_START: return fetchTasksStart( state,action );
      case actionTypes.FETCH_TASKS_SUCCESS: return fetchTasksSuccess( state,action );
      case actionTypes.FETCH_TASKS_FAIL: return fetchTasksFail( state,action );
      case actionTypes.POST_TASK_START: return postTaskStart( state,action );
      case actionTypes.POST_TASK_SUCCESS: return postTaskSuccess( state,action );
      case actionTypes.POST_TASK_FAIL: return postTaskFail( state,action );
      case actionTypes.SET_TODAY: return setToday(state,action);
      default: return state;
    }
};

export default reducer;
