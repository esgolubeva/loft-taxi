import { takeEvery, call, put } from "redux-saga/effects";
import * as api from "./api";
import {
	fetchRouteRequest,
	fetchRouteSuccess,
	fetchRouteFailure
} from "./actions";

export function* fetchRouteRequestSaga(action) {
	try {
		let response = yield call(api.getRouteRequest, action);
		yield put(fetchRouteSuccess(response));
	} catch (error) {
		yield put(fetchRouteFailure(error));
		console.log(error);
	}
}

export function* routeSaga() {
	yield takeEvery(fetchRouteRequest, fetchRouteRequestSaga);
}
