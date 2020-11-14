import {
  GET_ERRORS,
  CLEAR_CURRENT_GROUP,
  GROUP_LOADING,
  GET_GROUP,
  GET_GROUPS,
  ADD_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP
} from "./types";
import {
  getGroup,
  getGroups,
  deleteGroup,
  saveGroup,
  updateGroup
} from "../services/groupService";
import { NotificationManager } from "react-notifications";

export const setGroupLoading = () => {
  return {
    type: GROUP_LOADING
  };
};

export const clearCurrentGroup = () => {
  return {
    type: CLEAR_CURRENT_GROUP
  };
};

export const getGroupItem = id => async dispatch => {
  dispatch(setGroupLoading());
  const { data } = await getGroup(id);
  dispatch({
    type: GET_GROUP,
    payload: data
  });
};

export const getGroupItems = () => async dispatch => {
  dispatch(setGroupLoading());
  const { data } = await getGroups();
  dispatch({
    type: GET_GROUPS,
    payload: data
  });
};

export const addGroupItem = group => async dispatch => {
  try {
    const { data } = await saveGroup(group);
    dispatch({
      type: ADD_GROUP,
      payload: data
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const updateGroupItem = group => async dispatch => {
  try {
    await updateGroup(group);
    dispatch({
      type: UPDATE_GROUP,
      payload: group
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const deleteGroupItem = id => async dispatch => {
  try {
    await deleteGroup(id);
    dispatch({
      type: DELETE_GROUP,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.warning("این آیتم قبلا حذف شده است.");
    }
  }
};
