import {
  GET_ERRORS,
  CLEAR_CURRENT_COLOR,
  COLOR_LOADING,
  GET_COLOR,
  GET_COLORS,
  ADD_COLOR,
  UPDATE_COLOR,
  DELETE_COLOR
} from "./types";
import {
  getColor,
  getColors,
  deleteColor,
  saveColor,
  updateColor
} from "../services/colorService";
import { NotificationManager } from "react-notifications";

export const setColorLoading = () => {
  return {
    type: COLOR_LOADING
  };
};

export const clearCurrentColor = () => {
  return {
    type: CLEAR_CURRENT_COLOR
  };
};

export const getColorItem = id => async dispatch => {
  dispatch(setColorLoading());
  const { data } = await getColor(id);
  dispatch({
    type: GET_COLOR,
    payload: data
  });
};

export const getColorItems = () => async dispatch => {
  dispatch(setColorLoading());
  const { data } = await getColors();
  dispatch({
    type: GET_COLORS,
    payload: data
  });
};

export const addColorItem = color => async dispatch => {
  try {
    const { data } = await saveColor(color);
    dispatch({
      type: ADD_COLOR,
      payload: data
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const updateColorItem = color => async dispatch => {
  try {
    await updateColor(color);
    dispatch({
      type: UPDATE_COLOR,
      payload: color
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const deleteColorItem = id => async dispatch => {
  try {
    await deleteColor(id);
    dispatch({
      type: DELETE_COLOR,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.warning("این آیتم قبلا حذف شده است.");
    }
  }
};
