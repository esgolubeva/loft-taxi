import { takeEvery, call, put } from "redux-saga/effects";
import {
	fetchAddressRequest,
	fetchAddressSuccess,
	fetchAddressFailure
} from "./actions";

const getAddresses = () =>
	fetch("https://loft-taxi.glitch.me/addressList").then(response =>
		response.json()
	);

export function* handleAddress() {
	yield takeEvery(fetchAddressRequest, function*(action) {
		// try {
		let response = yield call(getAddresses, action);
		yield put(fetchAddressSuccess(response.addresses));
		// console.log(response.addresses);
		// } catch (error) {
		// 	yield put(fetchAddressFailure(error));
		// 	// console.log(error);
		// }
	});
}
