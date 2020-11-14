import {
  GET_ERRORS,
  CLEAR_CURRENT_MARKETSECTOR,
  MARKETSECTOR_LOADING,
  GET_MARKETSECTOR,
  GET_MARKETSECTORS,
  ADD_MARKETSECTOR,
  UPDATE_MARKETSECTOR,
  DELETE_MARKETSECTOR
} from "../actions/types";

const initialState = {
  marketSector: null,
  marketSectors: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MARKETSECTOR_LOADING:
      return { ...state, loading: true };
    case GET_MARKETSECTOR:
      return { ...state, marketSector: action.payload, loading: false };
    case GET_MARKETSECTORS:
      return { ...state, marketSectors: action.payload, loading: false };
    case ADD_MARKETSECTOR:
      return {
        ...state,
        marketSectors: [action.payload, ...state.marketSectors]
      };
    case UPDATE_MARKETSECTOR:
      const newMarketSectors = [...state.marketSectors];
      const index = newMarketSectors.findIndex(
        i => i._id === action.payload._id
      );
      newMarketSectors.splice(index, 1, action.payload);
      return { ...state, marketSectors: newMarketSectors };
    case DELETE_MARKETSECTOR:
      return {
        ...state,
        marketSectors: state.marketSectors.filter(
          marketSector => marketSector._id !== action.payload
        )
      };
    default:
      return state;
  }
}
