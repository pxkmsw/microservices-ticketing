import { createAction } from "@reduxjs/toolkit";

export const apiCall = createAction("api/call");
export const apiCallFailed = createAction("api/callFailed");
export const apiCallSuccess = createAction("api/callSuccess");
