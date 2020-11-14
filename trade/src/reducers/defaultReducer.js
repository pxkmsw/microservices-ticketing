import { SET_DEFAULT_SETTINGS } from "../actions/types";

const initialState = {
  default: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DEFAULT_SETTINGS:
      return { ...state, default: action.payload };
    default:
      return state;
  }
}
