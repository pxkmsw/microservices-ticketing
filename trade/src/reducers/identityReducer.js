import {
  IDENTITY_LOADING,
  GET_IDENTITIES,
  GET_IDENTITY,
  DELETE_IDENTITY,
  ADD_IDENTITY
} from "../actions/types";

const initialState = {
  identity: null,
  identities: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IDENTITY_LOADING:
      return { ...state, loading: true };
    case GET_IDENTITY:
      return { ...state, identity: action.payload, loading: false };
    case GET_IDENTITIES:
      return { ...state, identities: action.payload, loading: false };
    case ADD_IDENTITY:
      return { ...state, identities: [action.payload, ...state.identities] };
    case DELETE_IDENTITY:
      return {
        ...state,
        identities: state.identities.filter(
          identity => identity._id !== action.payload
        )
      };
    default:
      return state;
  }
}
