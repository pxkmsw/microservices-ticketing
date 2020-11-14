import {
  USER_LOADING,
  UPDATE_USER,
  GET_USERS,
  GET_USER,
  DELETE_USER,
  ADD_USER
} from "../actions/types";

const initialState = {
  user: null,
  users: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, loading: true };
    case UPDATE_USER:
      let filtered = state.users.filter(
        user => user._id !== action.payload._id
      );
      return {
        ...state,
        users: [...filtered, action.payload],
        loading: false
      };
    case GET_USER:
      return { ...state, user: action.payload, loading: false };
    case GET_USERS:
      return { ...state, users: action.payload, loading: false };
    case ADD_USER:
      return { ...state, users: [action.payload, ...state.users] };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    default:
      return state;
  }
}
