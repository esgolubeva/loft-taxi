import { createAction } from "redux-actions";

export const fetchAuthRequest = createAction("FETCH_AUTH_REQUEST");
export const fetchAuthSuccess = createAction("FETCH_AUTH_SUCCESS");
export const fetchAuthFailure = createAction("FETCH_AUTH_FAILURE");
