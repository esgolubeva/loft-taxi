import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
	fetchRegisterRequest,
	fetchRegisterSuccess,
	fetchRegisterFailure
} from "./actions";

const isLoggedIn = handleActions(
	{
		[fetchRegisterRequest]: () => false,
		[fetchRegisterFailure]: () => false,
		[fetchRegisterSuccess]: () => true
	},
	window.localStorage.getItem("token") ? true : false
);

const error = handleActions(
	{
		[fetchRegisterRequest]: () => null,
		[fetchRegisterFailure]: (_state, action) => action.payload,
		[fetchRegisterSuccess]: () => null
	},
	null
);

export default combineReducers({
	isLoggedIn,
	error
});
