import { takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";
import {
	sendAuthRequest,
	sendAuthSuccess,
	sendAuthFailure,
	fetchLogout,
	sendRegisterFailure,
	sendRegisterSuccess,
	sendRegisterRequest
} from "./actions";

const postAuthRequest = (action, path) => {
	return axios
		.post(`https://loft-taxi.glitch.me/${path}`, action.payload)
		.then(response => {
			if (!response.data.success) {
				throw Error(response.data.error);
			}
			return response.data;
		});
};

function saveToken(token) {
	window.localStorage.setItem("token", token);
}

export function* handleAuth() {
	yield takeEvery(sendAuthRequest, function*(action) {
		try {
			const path = "auth";
			const response = yield call(postAuthRequest, action, path);
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
			const response = yield call(postAuthRequest, action, path);
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
