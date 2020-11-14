import { SET_DEFAULT_SETTINGS } from "./types";
import { setDefault } from "../services/defaultService";
import { NotificationManager } from "react-notifications";

export const setDefaultSettings = () => async dispatch => {
  try {
    const { data } = await setDefault();
    dispatch({
      type: SET_DEFAULT_SETTINGS,
      payload: data
    });
    NotificationManager.info("تنظیمات اولیه اعمال شد.");
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};
