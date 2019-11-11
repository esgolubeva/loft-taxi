import { createAction } from "redux-actions";

export const fetchCardRequest = createAction("FETCH_CARD_REQUEST");
export const fetchCardSuccess = createAction("FETCH_CARD_SUCCESS");
export const fetchCardFailure = createAction("FETCH_CARD_FAILURE");
