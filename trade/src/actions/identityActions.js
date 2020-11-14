import {
  GET_ERRORS,
  CLEAR_CURRENT_IDENTITY,
  IDENTITY_LOADING,
  GET_IDENTITY,
  GET_IDENTITIES,
  ADD_IDENTITY,
  DELETE_IDENTITY
} from "./types";
import {
  getIdentity,
  getIdentities,
  deleteIdentity,
  saveIdentity,
  updateIdentity
} from "../services/identityService";
import { NotificationManager } from "react-notifications";

export const setIdentityLoading = () => {
  return {
    type: IDENTITY_LOADING
  };
};

export const clearCurrentIdentity = () => {
  return {
    type: CLEAR_CURRENT_IDENTITY
  };
};

export const getIdentityItem = id => async dispatch => {
  dispatch(setIdentityLoading());
  const { data } = await getIdentity(id);
  dispatch({
    type: GET_IDENTITY,
    payload: data
  });
};

export const getIdentityItems = () => async dispatch => {
  dispatch(setIdentityLoading());
  const { data } = await getIdentities();
  dispatch({
    type: GET_IDENTITIES,
    payload: data
  });
};

export const addIdentityItem = identity => async dispatch => {
  try {
    await saveIdentity(identity);
    dispatch({
      type: ADD_IDENTITY,
      payload: identity
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const deleteIdentityItem = id => async dispatch => {
  try {
    await deleteIdentity(id);
    dispatch({
      type: DELETE_IDENTITY,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.warning("این آیتم قبلا حذف شده است.");
    }
  }
};
