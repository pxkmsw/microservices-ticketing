import {
  GET_ERRORS,
  CLEAR_CURRENT_ACCOUNT,
  ACCOUNT_LOADING,
  GET_ACCOUNT,
  GET_ACCOUNTS,
  ADD_ACCOUNT,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT
} from "./types";
import {
  getAccount,
  getAccounts,
  deleteAccount,
  saveAccount,
  updateAccount
} from "../services/accountService";
import { NotificationManager } from "react-notifications";

export const setAccountLoading = () => {
  return {
    type: ACCOUNT_LOADING
  };
};

export const clearCurrentAccount = () => {
  return {
    type: CLEAR_CURRENT_ACCOUNT
  };
};

export const getAccountItem = id => async dispatch => {
  dispatch(setAccountLoading());
  const { data } = await getAccount(id);
  dispatch({
    type: GET_ACCOUNT,
    payload: data
  });
};

export const getAccountItems = () => async dispatch => {
  dispatch(setAccountLoading());
  const { data } = await getAccounts();
  dispatch({
    type: GET_ACCOUNTS,
    payload: data
  });
};

export const addAccountItem = account => async dispatch => {
  try {
    const { data } = await saveAccount(account);
    dispatch({
      type: ADD_ACCOUNT,
      payload: data
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const updateAccountItem = account => async dispatch => {
  try {
    await updateAccount(account);
    dispatch({
      type: UPDATE_ACCOUNT,
      payload: account
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const deleteAccountItem = id => async dispatch => {
  try {
    await deleteAccount(id);
    dispatch({
      type: DELETE_ACCOUNT,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.warning("این آیتم قبلا حذف شده است.");
    }
  }
};
