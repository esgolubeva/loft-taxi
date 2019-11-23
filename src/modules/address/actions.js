import { createAction } from "redux-actions";

export const fetchAddressRequest = createAction("FETCH_ADDRESS_REQUEST");
export const fetchAddressSuccess = createAction("FETCH_ADDRESS_SUCCESS");
export const fetchAddressFailure = createAction("FETCH_ADDRESS_FAILURE");
