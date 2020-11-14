import {
  SETTING_LOADING,
  GET_SETTING,
  GET_SETTINGS,
  DELETE_SETTING,
  ADD_SETTING,
  CLEAR_CURRENT_SETTING
} from "../actions/types";

const initialState = {
  setting: null,
  settings: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SETTING_LOADING:
      return { ...state, loading: true };
    case GET_SETTING:
      return { ...state, setting: action.payload, loading: false };
    case GET_SETTINGS:
      return { ...state, settings: action.payload, loading: false };
    case ADD_SETTING:
      return { ...state, settings: [action.payload, ...state.settings] };
    case DELETE_SETTING:
      return {
        ...state,
        settings: state.settings.filter(
          setting => setting._id !== action.payload
        )
      };
    case CLEAR_CURRENT_SETTING:
      return { ...state, setting: null };
    default:
      return state;
  }
}
