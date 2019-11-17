import { takeEvery, call, put, fork } from "redux-saga/effects";
import {
	sendCardRequest,
	sendCardSuccess,
	sendCardFailure,
	fetchCardRequest,
	fetchCardSuccess,
	fetchCardFailure
} from "./actions";

const getResponse = (action, path) =>
	fetch(`https://loft-taxi.glitch.me/${path}`, {
		method: "POST",
		body: JSON.stringify(action.payload),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(data => {
			if (!data.success) {
				throw Error(data.error);
			}
			return data;
		});

function* sendCard() {
	yield takeEvery(sendCardRequest, function*(action) {
		try {
			const path = "card";
			yield call(getResponse, action, path);
			yield put(sendCardSuccess(action.payload));
		} catch (error) {
			yield put(sendCardFailure(error.message));
			console.log(error.message);
		}
	});
}

const getCard = (path, token) =>
	fetch(`https://loft-taxi.glitch.me/${path}?token=${token}`).then(response =>
		response.json()
	);

function* fetchCard() {
	yield takeEvery(fetchCardRequest, function*() {
		try {
			const path = "card";
			const token = window.localStorage.getItem("token");
			const response = yield call(getCard, path, token);
			console.log(response);
			yield put(fetchCardSuccess(response));
		} catch (error) {
			yield put(fetchCardFailure(error.message));
			console.log(error.message);
		}
	});
}

export function* paymentSaga() {
	yield fork(sendCard);
	yield fork(fetchCard);
}
