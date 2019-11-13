import { createAction } from "redux-actions";

export const fetchAuthRequest = createAction("FETCH_AUTH_REQUEST");
export const fetchAuthSuccess = createAction("FETCH_AUTH_SUCCESS");
export const fetchAuthFailure = createAction("FETCH_AUTH_FAILURE");
export const fetchRegisterRequest = createAction("FETCH_REGISTER_REQUEST");
export const fetchRegisterSuccess = createAction("FETCH_REGISTER_SUCCESS");
export const fetchRegisterFailure = createAction("FETCH_REGISTER_FAILURE");
export const fetchLogout = createAction("FETCH_LOGOUT");
