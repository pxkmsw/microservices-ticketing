import { COUNT_LOADING, ADD_COUNT } from "../actions/types";

const initialState = {
  counter: null,
  counters: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COUNT_LOADING:
      return { ...state, loading: true };
    case ADD_COUNT:
      return { ...state, counter: action.payload, loading: false };
    default:
      return state;
  }
}
