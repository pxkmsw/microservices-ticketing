import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { createSelector } from "reselect";
import { apiCall } from "./api";

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list.splice(index, 1);
    },

    bugAssigned: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list[index].userId = action.payload.userId;
    },

    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
  },
});

// Actions
const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssigned,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
// Reducer
export default slice.reducer;

const url = "/bugs";
// Action Creator
export const loadBugs = () => (dispatch, getState) => {
  // Caching
  const { lastFetch } = getState().entities.bugs;
  const diffInMins = moment().diff(moment(lastFetch), "minutes");
  if (diffInMins < 1) return;

  return dispatch(
    apiCall({
      url,
      onSuccess: bugsReceived.type,
      onStart: bugsRequested.type,
      onFailure: bugsRequestFailed.type,
    })
  );
};

export const addBug = bug =>
  apiCall({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = id =>
  apiCall({
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCall({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: bugAssigned.type,
  });

// Selectors
// export const getUnresolvedBugs = state => state.entities.bugs.filter(bug => !bug.resolved);

// Selector + Memoizing
export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs.list,
  bugs => bugs.filter(bug => !bug.resolved)
);

export const getMemberBugs = memberId =>
  createSelector(
    state => state.entities.bugs.list,
    bugs => bugs.filter(bug => bug.userId == memberId)
  );
// export const getMemberBugs = (state, id) => state.entities.bugs.filter(bug => bug.userId == id);
