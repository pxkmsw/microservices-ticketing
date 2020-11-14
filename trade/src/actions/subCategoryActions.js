import {
  GET_ERRORS,
  CLEAR_CURRENT_SUBCATEGORY,
  SUBCATEGORY_LOADING,
  GET_SUBCATEGORY,
  GET_SUBCATEGORIES,
  ADD_SUBCATEGORY,
  UPDATE_SUBCATEGORY,
  DELETE_SUBCATEGORY
} from "./types";
import {
  getSubCategory,
  getSubCategories,
  deleteSubCategory,
  saveSubCategory,
  updateSubCategory
} from "../services/subCategoryService";
import { NotificationManager } from "react-notifications";

export const setSubCategoryLoading = () => {
  return {
    type: SUBCATEGORY_LOADING
  };
};

export const clearCurrentSubCategory = () => {
  return {
    type: CLEAR_CURRENT_SUBCATEGORY
  };
};

export const getSubCategoryItem = id => async dispatch => {
  dispatch(setSubCategoryLoading());
  const { data } = await getSubCategory(id);
  dispatch({
    type: GET_SUBCATEGORY,
    payload: data
  });
};

export const getSubCategoryItems = () => async dispatch => {
  dispatch(setSubCategoryLoading());
  const { data } = await getSubCategories();
  dispatch({
    type: GET_SUBCATEGORIES,
    payload: data
  });
};

export const addSubCategoryItem = subCategory => async dispatch => {
  try {
    const { data } = await saveSubCategory(subCategory);
    dispatch({
      type: ADD_SUBCATEGORY,
      payload: data
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const updateSubCategoryItem = subCategory => async dispatch => {
  try {
    await updateSubCategory(subCategory);
    dispatch({
      type: UPDATE_SUBCATEGORY,
      payload: subCategory
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const deleteSubCategoryItem = id => async dispatch => {
  try {
    await deleteSubCategory(id);
    dispatch({
      type: DELETE_SUBCATEGORY,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.warning("این آیتم قبلا حذف شده است.");
    }
  }
};
