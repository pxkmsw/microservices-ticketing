import {
  PRODUCT_LOADING,
  GET_PRODUCT,
  GET_PRODUCTS,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  ADD_DIVERSITY_PRODUCT,
  UPDATE_PRODUCT,
  CLEAR_CURRENT_PRODUCT
} from "../actions/types";

const initialState = {
  product: null,
  products: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LOADING:
      return { ...state, loading: true };
    case GET_PRODUCT:
      return { ...state, product: action.payload, loading: false };
    case GET_PRODUCTS:
      return { ...state, products: action.payload, loading: false };
    case ADD_PRODUCT:
      return { ...state, products: [action.payload, ...state.products] };
    case ADD_DIVERSITY_PRODUCT:
      return { ...state, products: [action.payload, ...state.products] };
    case UPDATE_PRODUCT:
      return { ...state, product: action.payload };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.payload
        )
      };
    case CLEAR_CURRENT_PRODUCT:
      return { ...state, product: null };
    default:
      return state;
  }
}
