import { SYNC_PRODUCTS } from "./types";
import { syncProducts } from "../services/syncService";
import { NotificationManager } from "react-notifications";

export const syncProductsNow = () => async dispatch => {
  try {
    const { data } = await syncProducts();
    dispatch({
      type: SYNC_PRODUCTS,
      payload: data
    });
    NotificationManager.info("همگام سازی شروع شد...");
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};
