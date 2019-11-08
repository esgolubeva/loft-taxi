import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
	fetchAuthRequest,
	fetchAuthSuccess,
	fetchAuthFailure
} from "./actions";

const userInfo = handleActions(
	{
		[fetchAuthRequest]: (_state, action) => action.payload
	},
	{ email: "email@example.com", password: "password" }
);

const isLoggedIn = handleActions(
	{
		[fetchAuthRequest]: () => false,
		[fetchAuthFailure]: () => false,
		[fetchAuthSuccess]: () => true
	},
	false
);

const error = handleActions(
	{
		[fetchAuthRequest]: () => null,
		[fetchAuthFailure]: (_state, action) => action.payload,
		[fetchAuthSuccess]: () => null
	},
	null
);

export default combineReducers({
	userInfo,
	isLoggedIn,
	error
});
