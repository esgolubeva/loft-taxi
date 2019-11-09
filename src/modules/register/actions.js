import { createAction } from "redux-actions";

export const fetchRegisterRequest = createAction("FETCH_REGISTER_REQUEST");
export const fetchRegisterSuccess = createAction("FETCH_REGISTER_SUCCESS");
export const fetchRegisterFailure = createAction("FETCH_REGISTER_FAILURE");
