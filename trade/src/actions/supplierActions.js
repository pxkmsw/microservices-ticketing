import {
  GET_ERRORS,
  CLEAR_CURRENT_SUPPLIER,
  SUPPLIER_LOADING,
  GET_SUPPLIER,
  GET_SUPPLIERS,
  ADD_SUPPLIER,
  UPDATE_SUPPLIER,
  DELETE_SUPPLIER
} from "./types";
import {
  getSupplier,
  getSuppliers,
  deleteSupplier,
  saveSupplier,
  updateSupplier
} from "../services/supplierService";
import { NotificationManager } from "react-notifications";

export const setSupplierLoading = () => {
  return {
    type: SUPPLIER_LOADING
  };
};

export const clearCurrentSupplier = () => {
  return {
    type: CLEAR_CURRENT_SUPPLIER
  };
};

export const getSupplierItem = id => async dispatch => {
  dispatch(setSupplierLoading());
  const { data } = await getSupplier(id);
  dispatch({
    type: GET_SUPPLIER,
    payload: data
  });
};

export const getSupplierItems = () => async dispatch => {
  dispatch(setSupplierLoading());
  const { data } = await getSuppliers();
  dispatch({
    type: GET_SUPPLIERS,
    payload: data
  });
};

export const addSupplierItem = supplier => async dispatch => {
  try {
    const { data } = await saveSupplier(supplier);
    dispatch({
      type: ADD_SUPPLIER,
      payload: data
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const updateSupplierItem = supplier => async dispatch => {
  try {
    await updateSupplier(supplier);
    dispatch({
      type: UPDATE_SUPPLIER,
      payload: supplier
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const deleteSupplierItem = id => async dispatch => {
  try {
    await deleteSupplier(id);
    dispatch({
      type: DELETE_SUPPLIER,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.warning("این آیتم قبلا حذف شده است.");
    }
  }
};
