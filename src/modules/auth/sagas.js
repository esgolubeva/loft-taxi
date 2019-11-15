import { takeEvery, call, put } from "redux-saga/effects";
import {
	fetchAuthRequest,
	fetchAuthSuccess,
	fetchAuthFailure,
	fetchLogout,
} from "./actions";

const getAuth = action =>
	fetch("https://loft-taxi.glitch.me/auth", {
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

function saveToken(token) {
	window.localStorage.setItem("token", token);
}

export function* handleAuth() {
	yield takeEvery(fetchAuthRequest, function*(action) {
		try {
			const response = yield call(getAuth, action);
			yield call(saveToken, response.token);
			yield put(fetchAuthSuccess());
		} catch (error) {
			yield put(fetchAuthFailure(error.message));
			console.log(error.message);
		}
	});
	yield takeEvery(fetchLogout, function() {
		window.localStorage.removeItem("token");
	});
}
