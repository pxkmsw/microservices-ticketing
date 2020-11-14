import {
  GET_ERRORS,
  CLEAR_CURRENT_MATERIAL,
  MATERIAL_LOADING,
  GET_MATERIAL,
  GET_MATERIALS,
  ADD_MATERIAL,
  UPDATE_MATERIAL,
  DELETE_MATERIAL
} from "./types";
import {
  getMaterial,
  getMaterials,
  deleteMaterial,
  saveMaterial,
  updateMaterial
} from "../services/materialService";
import { NotificationManager } from "react-notifications";

export const setMaterialLoading = () => {
  return {
    type: MATERIAL_LOADING
  };
};

export const clearCurrentMaterial = () => {
  return {
    type: CLEAR_CURRENT_MATERIAL
  };
};

export const getMaterialItem = id => async dispatch => {
  dispatch(setMaterialLoading());
  const { data } = await getMaterial(id);
  dispatch({
    type: GET_MATERIAL,
    payload: data
  });
};

export const getMaterialItems = () => async dispatch => {
  dispatch(setMaterialLoading());
  const { data } = await getMaterials();
  dispatch({
    type: GET_MATERIALS,
    payload: data
  });
};

export const addMaterialItem = material => async dispatch => {
  try {
    const { data } = await saveMaterial(material);
    dispatch({
      type: ADD_MATERIAL,
      payload: data
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const updateMaterialItem = material => async dispatch => {
  try {
    await updateMaterial(material);
    dispatch({
      type: UPDATE_MATERIAL,
      payload: material
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const deleteMaterialItem = id => async dispatch => {
  try {
    await deleteMaterial(id);
    dispatch({
      type: DELETE_MATERIAL,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.warning("این آیتم قبلا حذف شده است.");
    }
  }
};
