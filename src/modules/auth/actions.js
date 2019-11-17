import { createAction } from "redux-actions";

export const sendAuthRequest = createAction("SEND_AUTH_REQUEST");
export const sendAuthSuccess = createAction("SEND_AUTH_SUCCESS");
export const sendAuthFailure = createAction("SEND_AUTH_FAILURE");
export const sendRegisterRequest = createAction("SEND_REGISTER_REQUEST");
export const sendRegisterSuccess = createAction("SEND_REGISTER_SUCCESS");
export const sendRegisterFailure = createAction("SEND_REGISTER_FAILURE");
export const fetchLogout = createAction("FETCH_LOGOUT");
