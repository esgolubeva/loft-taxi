import { takeEvery, call, put } from "redux-saga/effects";
import {
	fetchRouteRequest,
	fetchRouteSuccess,
	fetchRouteFailure
} from "./actions";

const getRoute = action =>
	fetch(
		`https://loft-taxi.glitch.me/route?address1=${action.payload.from}&address2=${action.payload.to}`
	).then(response => response.json());

export function* routeSaga() {
	yield takeEvery(fetchRouteRequest, function*(action) {
		try {
			let response = yield call(getRoute, action);
			yield put(fetchRouteSuccess(response));
			console.log(response);
		} catch (error) {
			yield put(fetchRouteFailure(error));
			console.log(error);
		}
	});
}
