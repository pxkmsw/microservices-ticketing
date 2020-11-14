import { SYNC_PRODUCTS } from "../actions/types";

const initialState = {
  sync: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SYNC_PRODUCTS:
      return { ...state, default: action.payload };
    default:
      return state;
  }
}
