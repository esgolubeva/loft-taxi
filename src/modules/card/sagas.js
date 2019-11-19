import axios from "axios";

import { takeEvery, call, put, fork } from "redux-saga/effects";
import {
	sendCardRequest,
	sendCardSuccess,
	sendCardFailure,
	fetchCardRequest,
	fetchCardSuccess,
	fetchCardFailure,
	setPaymentMethodSaved
} from "./actions";

const postCardRequest = (action, path) => {
	const token = window.localStorage.getItem("token");
	return axios
		.post(`https://loft-taxi.glitch.me/${path}`, { ...action.payload, token })
		.then(response => {
			if (!response.data.success) {
				throw Error(response.data.error);
			}
			return response.data;
		});
};

function* sendCard() {
	yield takeEvery(sendCardRequest, function*(action) {
		try {
			const path = "card";
			yield call(postCardRequest, action, path);
			yield put(sendCardSuccess(action.payload));
		} catch (error) {
			yield put(sendCardFailure(error.message));
			console.log(error.message);
		}
	});
}

const getCardRequest = path => {
	const token = window.localStorage.getItem("token");
	return axios
		.get(`https://loft-taxi.glitch.me/${path}?token=${token}`)
		.then(response => {
			if (response.data.hasOwnProperty("error")) {
				throw Error(response.data.error);
			}
			return response.data;
		});
};

function* fetchCard() {
	yield takeEvery(fetchCardRequest, function*() {
		try {
			const path = "card";
			const response = yield call(getCardRequest, path);
			yield put(fetchCardSuccess(response));
			// yield put(setPaymentMethodSaved());
		} catch (error) {
			yield put(fetchCardFailure(error));
			console.log(error);
		}
	});
}

export function* paymentSaga() {
	yield fork(sendCard);
	yield fork(fetchCard);
}
