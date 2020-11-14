import {
  SUBCATEGORY_LOADING,
  GET_SUBCATEGORIES,
  GET_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  ADD_SUBCATEGORY,
  UPDATE_SUBCATEGORY
} from "../actions/types";

const initialState = {
  subCaterory: null,
  subCategories: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUBCATEGORY_LOADING:
      return { ...state, loading: true };
    case GET_SUBCATEGORY:
      return { ...state, subCaterory: action.payload, loading: false };
    case GET_SUBCATEGORIES:
      return { ...state, subCategories: action.payload, loading: false };
    case ADD_SUBCATEGORY:
      return {
        ...state,
        subCategories: [action.payload, ...state.subCategories]
      };
    case UPDATE_SUBCATEGORY:
      const newsubCategories = [...state.subCategories];
      const index = newsubCategories.findIndex(
        i => i._id === action.payload._id
      );
      newsubCategories.splice(index, 1, action.payload);
      return { ...state, subCategories: newsubCategories };
    case DELETE_SUBCATEGORY:
      return {
        ...state,
        subCategories: state.subCategories.filter(
          subCaterory => subCaterory._id !== action.payload
        )
      };
    default:
      return state;
  }
}
