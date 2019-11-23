import { takeEvery, call, put, fork } from "redux-saga/effects";
import * as api from "./api";

import {
	sendCardRequest,
	sendCardSuccess,
	sendCardFailure,
	fetchCardRequest,
	fetchCardSuccess,
	fetchCardFailure
} from "./actions";

export function* sendCardRequestSaga(action) {
	try {
		const path = "card";
		yield call(api.postCardRequest, action, path);
		yield put(sendCardSuccess(action.payload));
	} catch (error) {
		yield put(sendCardFailure(error));
		console.log(error);
	}
}

export function* fetchCardRequestSaga() {
	try {
		const path = "card";
		const response = yield call(api.getCardRequest, path);
		yield put(fetchCardSuccess(response));
	} catch (error) {
		yield put(fetchCardFailure(error));
		console.log(error);
	}
}

export function* sendCard() {
	yield takeEvery(sendCardRequest, sendCardRequestSaga);
}

export function* fetchCard() {
	yield takeEvery(fetchCardRequest, fetchCardRequestSaga);
}

export function* paymentSaga() {
	yield fork(sendCard);
	yield fork(fetchCard);
}
