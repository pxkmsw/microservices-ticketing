import {
  USER_LOADING,
  GET_USER,
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER
} from "./types";

import {
  getUser,
  getUsers,
  deleteUser,
  saveUser,
  updateUser
} from "../services/userService";
import { NotificationManager } from "react-notifications";

export const setCurrentUser = () => {
  return { type: USER_LOADING };
};

export const getUserItems = () => async dispatch => {
  dispatch(setCurrentUser());
  const { data } = await getUsers();
  dispatch({
    type: GET_USERS,
    payload: data
  });
};

export const getUserItem = id => async dispatch => {
  dispatch(setCurrentUser());
  try {
    const { data } = await getUser(id);
    dispatch({
      type: GET_USER,
      payload: data
    });
  } catch (ex) {
    if (ex.response) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const addUserItem = user => async dispatch => {
  try {
    await saveUser(user);
    dispatch({
      type: ADD_USER,
      payload: user
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const updateUserItem = user => async dispatch => {
  try {
    dispatch(setCurrentUser());
    await updateUser(user);
    dispatch({
      type: UPDATE_USER,
      payload: user
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const deleteUserItem = id => async dispatch => {
  try {
    await deleteUser(id);
    dispatch({
      type: DELETE_USER,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.warning("این آیتم قبلا حذف شده است.");
    }
  }
};
