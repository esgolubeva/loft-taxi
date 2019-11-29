import { takeEvery, call, put } from "redux-saga/effects";
import * as api from "./api";
import {
	fetchAddressRequest,
	fetchAddressSuccess,
	fetchAddressFailure
} from "./actions";

export function* fetchAddressRequestSaga() {
	try {
		const path = "addressList";
		let response = yield call(api.getAddressRequest, path);
		yield put(fetchAddressSuccess(response.addresses));
	} catch (error) {
		yield put(fetchAddressFailure(error));
		console.log(error);
	}
}

export function* addressSaga() {
	yield takeEvery(fetchAddressRequest, fetchAddressRequestSaga);
}
