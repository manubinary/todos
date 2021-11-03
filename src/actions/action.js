import {
  CREATE_TODO,
  RETRIEVE_TODOS,
  RETRIEVE_SELECTED,
  UPDATE_TODO
} from "./types";

import TodoDataService from "../services/service";

export const createTodos = (title, description) => async (dispatch) => {
  try {
    const res = await TodoDataService.create({ title, description });

    dispatch({
      type: CREATE_TODO,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveTodos = () => async (dispatch) => {
  try {
    const res = await TodoDataService.getAll();

    dispatch({
      type: RETRIEVE_TODOS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const retrieveTodo = (id) => async (dispatch) => {
  try {
    const res = await TodoDataService.get(id);
    dispatch({
      type: RETRIEVE_SELECTED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};


export const updateTodo = (id, data) => async (dispatch) => {
  try {
    const res = await TodoDataService.update(id, data);

    dispatch({
      type: UPDATE_TODO,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const createTodo = (data) => async (dispatch) => {
  try {
    await TodoDataService.create(data);

    dispatch({
      type: CREATE_TODO,
      payload: { data },
    });
  } catch (err) {
    console.log(err);
  }
};
