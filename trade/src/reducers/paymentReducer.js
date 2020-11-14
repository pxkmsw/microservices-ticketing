import {
  PAYMENT_LOADING,
  GET_PAYMENTS,
  GET_PAYMENT,
  DELETE_PAYMENT,
  ADD_PAYMENT,
  UPDATE_PAYMENT
} from "../actions/types";

const initialState = {
  payment: null,
  payments: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PAYMENT_LOADING:
      return { ...state, loading: true };
    case GET_PAYMENT:
      return { ...state, payment: action.payload, loading: false };
    case GET_PAYMENTS:
      return { ...state, payments: action.payload, loading: false };
    case ADD_PAYMENT:
      return { ...state, payments: [action.payload, ...state.payments] };
    case UPDATE_PAYMENT:
      const newpayments = [...state.payments];
      const index = newpayments.findIndex(i => i._id === action.payload._id);
      newpayments.splice(index, 1, action.payload);
      return { ...state, payments: newpayments };
    case DELETE_PAYMENT:
      return {
        ...state,
        payments: state.payments.filter(
          payment => payment._id !== action.payload
        )
      };
    default:
      return state;
  }
}
