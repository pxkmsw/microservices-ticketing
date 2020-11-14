import {
  ACCOUNT_LOADING,
  GET_ACCOUNTS,
  GET_ACCOUNT,
  DELETE_ACCOUNT,
  ADD_ACCOUNT,
  UPDATE_ACCOUNT
} from "../actions/types";

const initialState = {
  account: null,
  accounts: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_LOADING:
      return { ...state, loading: true };
    case GET_ACCOUNT:
      return { ...state, account: action.payload, loading: false };
    case GET_ACCOUNTS:
      return { ...state, accounts: action.payload, loading: false };
    case ADD_ACCOUNT:
      return { ...state, accounts: [action.payload, ...state.accounts] };
    case UPDATE_ACCOUNT:
      const newaccounts = [...state.accounts];
      const index = newaccounts.findIndex(i => i._id === action.payload._id);
      newaccounts.splice(index, 1, action.payload);
      return { ...state, accounts: newaccounts };
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(
          account => account._id !== action.payload
        )
      };
    default:
      return state;
  }
}
