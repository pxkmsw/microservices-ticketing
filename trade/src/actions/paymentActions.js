import {
  GET_ERRORS,
  CLEAR_CURRENT_PAYMENT,
  PAYMENT_LOADING,
  GET_PAYMENT,
  GET_PAYMENTS,
  ADD_PAYMENT,
  UPDATE_PAYMENT,
  DELETE_PAYMENT
} from "./types";
import {
  getPayment,
  getPayments,
  deletePayment,
  savePayment,
  updatePayment
} from "../services/paymentService";
import { NotificationManager } from "react-notifications";

export const setPaymentLoading = () => {
  return {
    type: PAYMENT_LOADING
  };
};

export const clearCurrentPayment = () => {
  return {
    type: CLEAR_CURRENT_PAYMENT
  };
};

export const getPaymentItem = id => async dispatch => {
  dispatch(setPaymentLoading());
  const { data } = await getPayment(id);
  dispatch({
    type: GET_PAYMENT,
    payload: data
  });
};

export const getPaymentItems = () => async dispatch => {
  dispatch(setPaymentLoading());
  const { data } = await getPayments();
  dispatch({
    type: GET_PAYMENTS,
    payload: data
  });
};

export const addPaymentItem = payment => async dispatch => {
  try {
    const { data } = await savePayment(payment);
    dispatch({
      type: ADD_PAYMENT,
      payload: data
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const updatePaymentItem = payment => async dispatch => {
  try {
    await updatePayment(payment);
    dispatch({
      type: UPDATE_PAYMENT,
      payload: payment
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const deletePaymentItem = id => async dispatch => {
  try {
    await deletePayment(id);
    dispatch({
      type: DELETE_PAYMENT,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.warning("این آیتم قبلا حذف شده است.");
    }
  }
};
