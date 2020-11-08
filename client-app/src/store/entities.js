import { combineReducers } from "redux";
import projectsReducer from "./projects";
import membersReducer from "./members";
import bugsReducer from "./bugs";

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  members: membersReducer,
});
