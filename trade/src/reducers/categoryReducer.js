import {
  CATEGORY_LOADING,
  GET_CATEGORIES,
  GET_CATEGORY,
  DELETE_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY
} from "../actions/types";

const initialState = {
  category: null,
  categories: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_LOADING:
      return { ...state, loading: true };
    case GET_CATEGORY:
      return { ...state, category: action.payload, loading: false };
    case GET_CATEGORIES:
      return { ...state, categories: action.payload, loading: false };
    case ADD_CATEGORY:
      return { ...state, categories: [action.payload, ...state.categories] };
    case UPDATE_CATEGORY:
      const newCategories = [...state.categories];
      const index = newCategories.findIndex(i => i._id === action.payload._id);
      newCategories.splice(index, 1, action.payload);
      return { ...state, categories: newCategories };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category._id !== action.payload
        )
      };
    default:
      return state;
  }
}
