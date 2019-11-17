import { takeEvery, call, put } from "redux-saga/effects";
import {
	sendAuthRequest,
	sendAuthSuccess,
	sendAuthFailure,
	fetchLogout,
	sendRegisterFailure,
	sendRegisterSuccess,
	sendRegisterRequest,
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

function saveToken(token) {
	window.localStorage.setItem("token", token);
}

export function* handleAuth() {
	yield takeEvery(sendAuthRequest, function*(action) {
		try {
			const path = "auth";
			const response = yield call(getResponse, action, path);
			yield call(saveToken, response.token);
			yield put(sendAuthSuccess());
		} catch (error) {
			yield put(sendAuthFailure(error.message));
			console.log(error.message);
		}
	});
	yield takeEvery(fetchLogout, function() {
		window.localStorage.removeItem("token");
	});
}

export function* handleRegister() {
	yield takeEvery(sendRegisterRequest, function*(action) {
		try {
			const path = "register";
			const response = yield call(getResponse, action, path);
			yield call(saveToken, response.token);
			yield put(sendRegisterSuccess());
		} catch (error) {
			yield put(sendRegisterFailure(error.message));
			console.log(error.message);
		}
	});
	yield takeEvery(fetchLogout, function() {
		window.localStorage.removeItem("token");
	});
}
