import {
  COLOR_LOADING,
  GET_COLORS,
  GET_COLOR,
  DELETE_COLOR,
  ADD_COLOR,
  UPDATE_COLOR
} from "../actions/types";

const initialState = {
  color: null,
  colors: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COLOR_LOADING:
      return { ...state, loading: true };
    case GET_COLOR:
      return { ...state, color: action.payload, loading: false };
    case GET_COLORS:
      return { ...state, colors: action.payload, loading: false };
    case ADD_COLOR:
      return { ...state, colors: [action.payload, ...state.colors] };
    case UPDATE_COLOR:
      const newcolors = [...state.colors];
      const index = newcolors.findIndex(i => i._id === action.payload._id);
      newcolors.splice(index, 1, action.payload);
      return { ...state, colors: newcolors };
    case DELETE_COLOR:
      return {
        ...state,
        colors: state.colors.filter(color => color._id !== action.payload)
      };
    default:
      return state;
  }
}
