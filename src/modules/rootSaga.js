import { fork } from "redux-saga/effects";
import { authSaga, registerSaga } from "./auth/sagas";
import { paymentSaga } from "./card/sagas";
import { addressSaga } from "./address/sagas";
import { routeSaga } from "./route/sagas";

export function* rootSaga() {
	yield fork(authSaga);
	yield fork(registerSaga);
	yield fork(paymentSaga);
	yield fork(addressSaga);
	yield fork(routeSaga);
}
