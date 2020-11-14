import {
  GROUP_LOADING,
  GET_GROUPS,
  GET_GROUP,
  DELETE_GROUP,
  ADD_GROUP,
  UPDATE_GROUP
} from "../actions/types";

const initialState = {
  group: null,
  groups: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GROUP_LOADING:
      return { ...state, loading: true };
    case GET_GROUP:
      return { ...state, group: action.payload, loading: false };
    case GET_GROUPS:
      return { ...state, groups: action.payload, loading: false };
    case ADD_GROUP:
      return { ...state, groups: [action.payload, ...state.groups] };
    case UPDATE_GROUP:
      const newgroups = [...state.groups];
      const index = newgroups.findIndex(i => i._id === action.payload._id);
      newgroups.splice(index, 1, action.payload);
      return { ...state, groups: newgroups };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter(group => group._id !== action.payload)
      };
    default:
      return state;
  }
}
