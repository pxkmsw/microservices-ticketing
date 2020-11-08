import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let id = 0;
const slice = createSlice({
  name: "members",
  initialState: {},
  reducers: {
    memberAdded: (members, action) => {
      id++;
      members[id] = {
        id: id,
        name: action.payload.name,
        position: action.payload.position,
      };
    },
  },
});

export const { memberAdded } = slice.actions;
export default slice.reducer;

export const getMemberInfo = memberId =>
  createSelector(
    state => state.entities.members,
    members => members[memberId]
  );
// export const getMemberInfo = (state, id) => state.entities.members[id];
