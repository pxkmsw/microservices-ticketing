import {
  ACCOUNTLEVEL_LOADING,
  GET_ACCOUNTLEVELS,
  GET_ACCOUNTLEVEL,
  DELETE_ACCOUNTLEVEL,
  ADD_ACCOUNTLEVEL,
  UPDATE_ACCOUNTLEVEL
} from "../actions/types";

const initialState = {
  accountLevel: null,
  accountLevels: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ACCOUNTLEVEL_LOADING:
      return { ...state, loading: true };
    case GET_ACCOUNTLEVEL:
      return { ...state, accountLevel: action.payload, loading: false };
    case GET_ACCOUNTLEVELS:
      return { ...state, accountLevels: action.payload, loading: false };
    case ADD_ACCOUNTLEVEL:
      return {
        ...state,
        accountLevels: [action.payload, ...state.accountLevels]
      };
    case UPDATE_ACCOUNTLEVEL:
      const newaccountLevels = [...state.accountLevels];
      const index = newaccountLevels.findIndex(
        i => i._id === action.payload._id
      );
      newaccountLevels.splice(index, 1, action.payload);
      return { ...state, accountLevels: newaccountLevels };
    case DELETE_ACCOUNTLEVEL:
      return {
        ...state,
        accountLevels: state.accountLevels.filter(
          accountLevel => accountLevel._id !== action.payload
        )
      };
    default:
      return state;
  }
}
