import {
  GET_ERRORS,
  CLEAR_CURRENT_MARKETSECTOR,
  MARKETSECTOR_LOADING,
  GET_MARKETSECTOR,
  GET_MARKETSECTORS,
  ADD_MARKETSECTOR,
  UPDATE_MARKETSECTOR,
  DELETE_MARKETSECTOR
} from "./types";
import {
  getMarketSector,
  getMarketSectors,
  deleteMarketSector,
  saveMarketSector,
  updateMarketSector
} from "../services/marketSectorService";
import { NotificationManager } from "react-notifications";

export const setMarketSectorLoading = () => {
  return {
    type: MARKETSECTOR_LOADING
  };
};

export const clearCurrentMarketSector = () => {
  return {
    type: CLEAR_CURRENT_MARKETSECTOR
  };
};

export const getMarketSectorItem = id => async dispatch => {
  dispatch(setMarketSectorLoading());
  const { data } = await getMarketSector(id);
  dispatch({
    type: GET_MARKETSECTOR,
    payload: data
  });
};

export const getMarketSectorItems = () => async dispatch => {
  dispatch(setMarketSectorLoading());
  const { data } = await getMarketSectors();
  dispatch({
    type: GET_MARKETSECTORS,
    payload: data
  });
};

export const addMarketSectorItem = marketSector => async dispatch => {
  try {
    const { data } = await saveMarketSector(marketSector);
    dispatch({
      type: ADD_MARKETSECTOR,
      payload: data
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const updateMarketSectorItem = marketSector => async dispatch => {
  try {
    await updateMarketSector(marketSector);
    dispatch({
      type: UPDATE_MARKETSECTOR,
      payload: marketSector
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const deleteMarketSectorItem = id => async dispatch => {
  try {
    await deleteMarketSector(id);
    dispatch({
      type: DELETE_MARKETSECTOR,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.warning("این آیتم قبلا حذف شده است.");
    }
  }
};
