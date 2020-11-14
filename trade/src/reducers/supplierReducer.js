import {
  SUPPLIER_LOADING,
  GET_SUPPLIERS,
  GET_SUPPLIER,
  DELETE_SUPPLIER,
  ADD_SUPPLIER,
  UPDATE_SUPPLIER
} from "../actions/types";

const initialState = {
  supplier: null,
  suppliers: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUPPLIER_LOADING:
      return { ...state, loading: true };
    case GET_SUPPLIER:
      return { ...state, supplier: action.payload, loading: false };
    case GET_SUPPLIERS:
      return { ...state, suppliers: action.payload, loading: false };
    case ADD_SUPPLIER:
      return { ...state, suppliers: [action.payload, ...state.suppliers] };
    case UPDATE_SUPPLIER:
      const newsuppliers = [...state.suppliers];
      const index = newsuppliers.findIndex(i => i._id === action.payload._id);
      newsuppliers.splice(index, 1, action.payload);
      return { ...state, suppliers: newsuppliers };
    case DELETE_SUPPLIER:
      return {
        ...state,
        suppliers: state.suppliers.filter(
          supplier => supplier._id !== action.payload
        )
      };
    default:
      return state;
  }
}
