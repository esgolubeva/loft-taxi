import { fork } from "redux-saga/effects";
import { handleAuth, handleRegister } from "./auth/sagas";
import { handleCard } from "./card/sagas";
import { handleAddress } from "./address/sagas";

export function* rootSaga() {
	yield fork(handleAuth);
	yield fork(handleRegister);
	yield fork(handleCard);
	yield fork(handleAddress);
}
