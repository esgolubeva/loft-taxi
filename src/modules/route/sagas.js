import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import {
	fetchRouteRequest,
	fetchRouteSuccess,
	fetchRouteFailure
} from "./actions";

const getRouteRequest = action => {
	return axios
		.get(
			`https://loft-taxi.glitch.me/route?address1=${action.payload.from}&address2=${action.payload.to}`
		)
		.then(response => response.data);
};

export function* routeSaga() {
	yield takeEvery(fetchRouteRequest, function*(action) {
		try {
			let response = yield call(getRouteRequest, action);
			yield put(fetchRouteSuccess(response));
		} catch (error) {
			yield put(fetchRouteFailure(error));
			console.log(error);
		}
	});
}
