import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
	fetchAuthRequest,
	fetchAuthSuccess,
	fetchAuthFailure,
	fetchLogout,
	fetchRegisterRequest,
	fetchRegisterSuccess,
	fetchRegisterFailure
} from "./actions";

const isLoggedIn = handleActions(
	{
		[fetchAuthRequest]: () => false,
		[fetchAuthFailure]: () => false,
		[fetchAuthSuccess]: () => true,
		[fetchRegisterRequest]: () => false,
		[fetchRegisterFailure]: () => false,
		[fetchRegisterSuccess]: () => true,
		[fetchLogout]: () => false
	},
	window.localStorage.getItem("token") ? true : false
);

const error = handleActions(
	{
		[fetchAuthRequest]: () => null,
		[fetchAuthFailure]: (_state, action) => action.payload,
		[fetchAuthSuccess]: () => null,
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
