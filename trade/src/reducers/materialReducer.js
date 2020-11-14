import {
  MATERIAL_LOADING,
  GET_MATERIALS,
  GET_MATERIAL,
  DELETE_MATERIAL,
  ADD_MATERIAL,
  UPDATE_MATERIAL
} from "../actions/types";

const initialState = {
  material: null,
  materials: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MATERIAL_LOADING:
      return { ...state, loading: true };
    case GET_MATERIAL:
      return { ...state, material: action.payload, loading: false };
    case GET_MATERIALS:
      return { ...state, materials: action.payload, loading: false };
    case ADD_MATERIAL:
      return { ...state, materials: [action.payload, ...state.materials] };
    case UPDATE_MATERIAL:
      const newmaterials = [...state.materials];
      const index = newmaterials.findIndex(i => i._id === action.payload._id);
      newmaterials.splice(index, 1, action.payload);
      return { ...state, materials: newmaterials };
    case DELETE_MATERIAL:
      return {
        ...state,
        materials: state.materials.filter(
          material => material._id !== action.payload
        )
      };
    default:
      return state;
  }
}
