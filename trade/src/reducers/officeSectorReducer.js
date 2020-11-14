import {
  GET_ERRORS,
  CLEAR_CURRENT_OFFICESECTOR,
  OFFICESECTOR_LOADING,
  GET_OFFICESECTOR,
  GET_OFFICESECTORS,
  ADD_OFFICESECTOR,
  UPDATE_OFFICESECTOR,
  DELETE_OFFICESECTOR
} from "../actions/types";

const initialState = {
  officeSector: null,
  officeSectors: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OFFICESECTOR_LOADING:
      return { ...state, loading: true };
    case GET_OFFICESECTOR:
      return { ...state, officeSector: action.payload, loading: false };
    case GET_OFFICESECTORS:
      return { ...state, officeSectors: action.payload, loading: false };
    case ADD_OFFICESECTOR:
      return {
        ...state,
        officeSectors: [action.payload, ...state.officeSectors]
      };
    case UPDATE_OFFICESECTOR:
      const newOfficeSectors = [...state.officeSectors];
      const index = newOfficeSectors.findIndex(
        i => i._id === action.payload._id
      );
      newOfficeSectors.splice(index, 1, action.payload);
      return { ...state, officeSectors: newOfficeSectors };
    case DELETE_OFFICESECTOR:
      return {
        ...state,
        officeSectors: state.officeSectors.filter(
          officeSector => officeSector._id !== action.payload
        )
      };
    default:
      return state;
  }
}
