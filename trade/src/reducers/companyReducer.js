import {
  COMPANY_LOADING,
  GET_COMPANIES,
  GET_COMPANY,
  DELETE_COMPANY,
  UPDATE_COMPANY,
  ADD_COMPANY
} from "../actions/types";

const initialState = {
  company: null,
  companies: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COMPANY_LOADING:
      return { ...state, loading: true };
    case GET_COMPANY:
      return { ...state, company: action.payload, loading: false };
    case GET_COMPANIES:
      return { ...state, companies: action.payload, loading: false };
    case ADD_COMPANY:
      return { ...state, companies: [action.payload, ...state.companies] };
    case UPDATE_COMPANY:
      return { ...state, company: action.payload };
    case DELETE_COMPANY:
      return {
        ...state,
        companies: state.companies.filter(
          company => company._id !== action.payload
        )
      };
    default:
      return state;
  }
}
