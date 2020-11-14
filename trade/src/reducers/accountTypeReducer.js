import {
  ACCOUNTTYPE_LOADING,
  GET_ACCOUNTTYPES,
  GET_ACCOUNTTYPE,
  DELETE_ACCOUNTTYPE,
  ADD_ACCOUNTTYPE,
  UPDATE_ACCOUNTTYPE
} from "../actions/types";

const initialState = {
  accountType: null,
  accountTypes: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ACCOUNTTYPE_LOADING:
      return { ...state, loading: true };
    case GET_ACCOUNTTYPE:
      return { ...state, accountType: action.payload, loading: false };
    case GET_ACCOUNTTYPES:
      return { ...state, accountTypes: action.payload, loading: false };
    case ADD_ACCOUNTTYPE:
      return {
        ...state,
        accountTypes: [action.payload, ...state.accountTypes]
      };
    case UPDATE_ACCOUNTTYPE:
      const newaccountTypes = [...state.accountTypes];
      const index = newaccountTypes.findIndex(
        i => i._id === action.payload._id
      );
      newaccountTypes.splice(index, 1, action.payload);
      return { ...state, accountTypes: newaccountTypes };
    case DELETE_ACCOUNTTYPE:
      return {
        ...state,
        accountTypes: state.accountTypes.filter(
          accountType => accountType._id !== action.payload
        )
      };
    default:
      return state;
  }
}
