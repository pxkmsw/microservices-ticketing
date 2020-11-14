import {
  GET_ERRORS,
  CLEAR_CURRENT_ACCOUNTTYPE,
  ACCOUNTTYPE_LOADING,
  GET_ACCOUNTTYPE,
  GET_ACCOUNTTYPES,
  ADD_ACCOUNTTYPE,
  UPDATE_ACCOUNTTYPE,
  DELETE_ACCOUNTTYPE
} from "./types";
import {
  getAccountType,
  getAccountTypes,
  deleteAccountType,
  saveAccountType,
  updateAccountType
} from "../services/accountTypeService";
import { NotificationManager } from "react-notifications";

export const setAccountTypeLoading = () => {
  return {
    type: ACCOUNTTYPE_LOADING
  };
};

export const clearCurrentAccountType = () => {
  return {
    type: CLEAR_CURRENT_ACCOUNTTYPE
  };
};

export const getAccountTypeItem = id => async dispatch => {
  dispatch(setAccountTypeLoading());
  const { data } = await getAccountType(id);
  dispatch({
    type: GET_ACCOUNTTYPE,
    payload: data
  });
};

export const getAccountTypeItems = () => async dispatch => {
  dispatch(setAccountTypeLoading());
  const { data } = await getAccountTypes();
  dispatch({
    type: GET_ACCOUNTTYPES,
    payload: data
  });
};

export const addAccountTypeItem = accountType => async dispatch => {
  try {
    const { data } = await saveAccountType(accountType);
    dispatch({
      type: ADD_ACCOUNTTYPE,
      payload: data
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const updateAccountTypeItem = accountType => async dispatch => {
  try {
    await updateAccountType(accountType);
    dispatch({
      type: UPDATE_ACCOUNTTYPE,
      payload: accountType
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const deleteAccountTypeItem = id => async dispatch => {
  try {
    await deleteAccountType(id);
    dispatch({
      type: DELETE_ACCOUNTTYPE,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.warning("این آیتم قبلا حذف شده است.");
    }
  }
};
