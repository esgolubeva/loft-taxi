import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import {
	fetchAddressRequest,
	fetchAddressSuccess,
	fetchAddressFailure
} from "./actions";

const getAddressRequest = path => {
	return axios.get(`https://loft-taxi.glitch.me/${path}`).then(response => {
		return response.data;
	});
};

export function* handleAddress() {
	yield takeEvery(fetchAddressRequest, function*() {
		try {
			const path = "addressList";
			let response = yield call(getAddressRequest, path);
			yield put(fetchAddressSuccess(response.addresses));
		} catch (error) {
			yield put(fetchAddressFailure(error));
			console.log(error);
		}
	});
}
