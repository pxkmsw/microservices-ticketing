import {
  GET_ERRORS,
  CLEAR_CURRENT_INVOICE,
  INVOICE_LOADING,
  GET_INVOICE,
  GET_INVOICES,
  ADD_INVOICE,
  UPDATE_INVOICE,
  DELETE_INVOICE
} from "./types";
import {
  getInvoice,
  getInvoices,
  deleteInvoice,
  saveInvoice,
  updateInvoice
} from "../services/invoiceService";
import { NotificationManager } from "react-notifications";

export const setInvoiceLoading = () => {
  return {
    type: INVOICE_LOADING
  };
};

export const clearCurrentInvoice = () => {
  return {
    type: CLEAR_CURRENT_INVOICE
  };
};

export const getInvoiceItem = id => async dispatch => {
  dispatch(setInvoiceLoading());
  const { data } = await getInvoice(id);
  dispatch({
    type: GET_INVOICE,
    payload: data
  });
};

export const getInvoiceItems = () => async dispatch => {
  dispatch(setInvoiceLoading());
  const { data } = await getInvoices();
  dispatch({
    type: GET_INVOICES,
    payload: data
  });
};

export const addInvoiceItem = invoice => async dispatch => {
  try {
    const { data } = await saveInvoice(invoice);
    dispatch({
      type: ADD_INVOICE,
      payload: data
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const updateInvoiceItem = invoice => async dispatch => {
  try {
    await updateInvoice(invoice);
    dispatch({
      type: UPDATE_INVOICE,
      payload: invoice
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const deleteInvoiceItem = id => async dispatch => {
  try {
    await deleteInvoice(id);
    dispatch({
      type: DELETE_INVOICE,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.warning("این آیتم قبلا حذف شده است.");
    }
  }
};
