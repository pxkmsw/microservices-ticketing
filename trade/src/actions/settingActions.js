import {
  GET_ERRORS,
  CLEAR_CURRENT_SETTING,
  SETTING_LOADING,
  GET_SETTING,
  GET_SETTINGS,
  ADD_SETTING,
  DELETE_SETTING,
  UPDATE_SETTING
} from "./types";
import {
  getSetting,
  getSettings,
  deleteSetting,
  saveSetting,
  updateSetting
} from "../services/settingService";
import { NotificationManager } from "react-notifications";

export const setSettingLoading = () => {
  return {
    type: SETTING_LOADING
  };
};

export const clearCurrentSetting = () => {
  return {
    type: CLEAR_CURRENT_SETTING
  };
};

export const getSettingItem = id => async dispatch => {
  dispatch(setSettingLoading());
  const { data } = await getSetting(id);
  dispatch({
    type: GET_SETTING,
    payload: data
  });
};

export const getSettingItems = () => async dispatch => {
  dispatch(setSettingLoading());
  const { data } = await getSettings();
  dispatch({
    type: GET_SETTINGS,
    payload: data
  });
};

export const addSettingItem = setting => async dispatch => {
  try {
    await saveSetting(setting);
    dispatch({
      type: ADD_SETTING,
      payload: setting
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const updateSettingItem = setting => async dispatch => {
  try {
    await updateSetting(setting);
    dispatch({
      type: UPDATE_SETTING,
      payload: setting
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const deleteSettingItem = id => async dispatch => {
  try {
    await deleteSetting(id);
    dispatch({
      type: DELETE_SETTING,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.warning("این آیتم قبلا حذف شده است.");
    }
  }
};
