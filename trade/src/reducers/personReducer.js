import {
  PERSON_LOADING,
  GET_PERSONS,
  GET_PERSON,
  DELETE_PERSON,
  ADD_PERSON
} from "../actions/types";

const initialState = {
  person: null,
  persons: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PERSON_LOADING:
      return { ...state, loading: true };
    case GET_PERSON:
      return { ...state, person: action.payload, loading: false };
    case GET_PERSONS:
      return { ...state, persons: action.payload, loading: false };
    case ADD_PERSON:
      return { ...state, persons: [action.payload, ...state.persons] };
    case DELETE_PERSON:
      return {
        ...state,
        persons: state.persons.filter(person => person._id !== action.payload)
      };
    default:
      return state;
  }
}
