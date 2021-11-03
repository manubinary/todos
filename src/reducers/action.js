import {
  CREATE_TODO,
  RETRIEVE_TODOS,
  RETRIEVE_SELECTED,
  UPDATE_TODO
} from "../actions/types";

const initialState = [];

function todoReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_TODOS:
      return [...state, {todos: payload}];

    case RETRIEVE_SELECTED:
      const newState = state;
      if (newState[1] && newState[1].selectedTodo) {
        newState[1].selectedTodo = payload;
      }
      return [...newState, {selectedTodo: payload}];

    case UPDATE_TODO:
      return [...state, {updateStatus: payload}];

    case CREATE_TODO:
      return [...state, {createStatus: payload}];


    default:
      return state;
  }
};

export default todoReducer;
