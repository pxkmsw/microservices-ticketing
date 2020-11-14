import {
  GET_ERRORS,
  CLEAR_CURRENT_OFFICESECTOR,
  OFFICESECTOR_LOADING,
  GET_OFFICESECTOR,
  GET_OFFICESECTORS,
  ADD_OFFICESECTOR,
  UPDATE_OFFICESECTOR,
  DELETE_OFFICESECTOR
} from "./types";
import {
  getOfficeSector,
  getOfficeSectors,
  deleteOfficeSector,
  saveOfficeSector,
  updateOfficeSector
} from "../services/officeSectorService";
import { NotificationManager } from "react-notifications";

export const setOfficeSectorLoading = () => {
  return {
    type: OFFICESECTOR_LOADING
  };
};

export const clearCurrentOfficeSector = () => {
  return {
    type: CLEAR_CURRENT_OFFICESECTOR
  };
};

export const getOfficeSectorItem = id => async dispatch => {
  dispatch(setOfficeSectorLoading());
  const { data } = await getOfficeSector(id);
  dispatch({
    type: GET_OFFICESECTOR,
    payload: data
  });
};

export const getOfficeSectorItems = () => async dispatch => {
  dispatch(setOfficeSectorLoading());
  const { data } = await getOfficeSectors();
  dispatch({
    type: GET_OFFICESECTORS,
    payload: data
  });
};

export const addOfficeSectorItem = officeSector => async dispatch => {
  try {
    const { data } = await saveOfficeSector(officeSector);
    dispatch({
      type: ADD_OFFICESECTOR,
      payload: data
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const updateOfficeSectorItem = officeSector => async dispatch => {
  try {
    await updateOfficeSector(officeSector);
    dispatch({
      type: UPDATE_OFFICESECTOR,
      payload: officeSector
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const deleteOfficeSectorItem = id => async dispatch => {
  try {
    await deleteOfficeSector(id);
    dispatch({
      type: DELETE_OFFICESECTOR,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.warning("این آیتم قبلا حذف شده است.");
    }
  }
};
