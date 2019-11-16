import { takeEvery, call, put } from "redux-saga/effects";
import {
	fetchCardFailure,
	fetchCardSuccess,
	fetchCardRequest,
} from "./actions";

const getResponse = (action, path) =>
	fetch(`https://loft-taxi.glitch.me/${path}`, {
		method: "POST",
		body: JSON.stringify(action.payload),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then(response => response.json())
		.then(data => {
			if (!data.success) {
				throw Error(data.error);
			}
			return data;
		});

export function* handleCard() {
	yield takeEvery(fetchCardRequest, function*(action) {
		try {
			const path = "card";
			yield call(getResponse, action, path);
			yield put(fetchCardSuccess(action.payload));
		} catch (error) {
			yield put(fetchCardFailure(error.message));
			console.log(error.message);
		}
	});
}
