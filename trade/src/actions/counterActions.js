import { COUNT_LOADING, ADD_COUNT } from "./types";
import { getCount } from "../services/counterService";
import { NotificationManager } from "react-notifications";

export const setCountLoading = () => {
  return {
    type: COUNT_LOADING
  };
};

export const getNewCount = () => async dispatch => {
  try {
    dispatch(setCountLoading());
    const { data } = await getCount();
    dispatch({
      type: ADD_COUNT,
      payload: data
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};
