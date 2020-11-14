import {
  INVOICE_LOADING,
  GET_INVOICES,
  GET_INVOICE,
  DELETE_INVOICE,
  ADD_INVOICE,
  UPDATE_INVOICE
} from "../actions/types";

const initialState = {
  invoice: null,
  invoices: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INVOICE_LOADING:
      return { ...state, loading: true };
    case GET_INVOICE:
      return { ...state, invoice: action.payload, loading: false };
    case GET_INVOICES:
      return { ...state, invoices: action.payload, loading: false };
    case ADD_INVOICE:
      return { ...state, invoices: [action.payload, ...state.invoices] };
    case UPDATE_INVOICE:
      const newinvoices = [...state.invoices];
      const index = newinvoices.findIndex(i => i._id === action.payload._id);
      newinvoices.splice(index, 1, action.payload);
      return { ...state, invoices: newinvoices };
    case DELETE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.filter(
          invoice => invoice._id !== action.payload
        )
      };
    default:
      return state;
  }
}
