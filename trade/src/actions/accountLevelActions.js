import {
  GET_ERRORS,
  CLEAR_CURRENT_ACCOUNTLEVEL,
  ACCOUNTLEVEL_LOADING,
  GET_ACCOUNTLEVEL,
  GET_ACCOUNTLEVELS,
  ADD_ACCOUNTLEVEL,
  UPDATE_ACCOUNTLEVEL,
  DELETE_ACCOUNTLEVEL
} from "./types";
import {
  getAccountLevel,
  getAccountLevels,
  deleteAccountLevel,
  saveAccountLevel,
  updateAccountLevel
} from "../services/accountLevelService";
import { NotificationManager } from "react-notifications";

export const setAccountLevelLoading = () => {
  return {
    type: ACCOUNTLEVEL_LOADING
  };
};

export const clearCurrentAccountLevel = () => {
  return {
    type: CLEAR_CURRENT_ACCOUNTLEVEL
  };
};

export const getAccountLevelItem = id => async dispatch => {
  dispatch(setAccountLevelLoading());
  const { data } = await getAccountLevel(id);
  dispatch({
    type: GET_ACCOUNTLEVEL,
    payload: data
  });
};

export const getAccountLevelItems = () => async dispatch => {
  dispatch(setAccountLevelLoading());
  const { data } = await getAccountLevels();
  dispatch({
    type: GET_ACCOUNTLEVELS,
    payload: data
  });
};

export const addAccountLevelItem = accountLevel => async dispatch => {
  try {
    const { data } = await saveAccountLevel(accountLevel);
    dispatch({
      type: ADD_ACCOUNTLEVEL,
      payload: data
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const updateAccountLevelItem = accountLevel => async dispatch => {
  try {
    await updateAccountLevel(accountLevel);
    dispatch({
      type: UPDATE_ACCOUNTLEVEL,
      payload: accountLevel
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const deleteAccountLevelItem = id => async dispatch => {
  try {
    await deleteAccountLevel(id);
    dispatch({
      type: DELETE_ACCOUNTLEVEL,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.warning("این آیتم قبلا حذف شده است.");
    }
  }
};
