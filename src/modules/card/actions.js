import { createAction } from "redux-actions";

export const sendCardRequest = createAction("SEND_CARD_REQUEST");
export const sendCardSuccess = createAction("SEND_CARD_SUCCESS");
export const sendCardFailure = createAction("SEND_CARD_FAILURE");
export const fetchCardRequest = createAction("FETCH_CARD_REQUEST");
export const fetchCardSuccess = createAction("FETCH_CARD_SUCCESS");
export const fetchCardFailure = createAction("FETCH_CARD_FAILURE");
export const setSuccessMessageIsShown = createAction("SET_SUCCESS_MESSAGE_IS_SHOWN")