import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
	sendCardFailure,
	sendCardSuccess,
	sendCardRequest,
	fetchCardRequest,
	fetchCardSuccess,
	fetchCardFailure,
	setSuccessMessageIsShown
} from "./actions";

import { fetchLogout } from "../auth/actions";

const paymentMethodSaved = handleActions(
	{
		[sendCardRequest]: () => false,
		[sendCardSuccess]: () => true,
		[sendCardFailure]: () => false,
		[fetchCardRequest]: () => false,
		[fetchCardSuccess]: () => true,
		[fetchCardFailure]: () => false,
		[fetchLogout]: () => false
	},
	false
);

const savedCard = handleActions(
	{
		[sendCardRequest]: () => {},
		[sendCardSuccess]: (_state, action) => action.payload,
		[fetchCardSuccess]: (_state, action) => action.payload
	},
	{}
);

const error = handleActions(
	{
		[sendCardRequest]: () => null,
		[sendCardSuccess]: () => null,
		[sendCardFailure]: (_state, action) => action.payload,
		[fetchCardRequest]: () => null,
		[fetchCardSuccess]: () => null,
		[fetchCardFailure]: (_state, action) => action.payload,
		[fetchLogout]: () => null
	},
	null
);

const successMessageIsShown = handleActions(
	{
		[sendCardRequest]: () => false,
		[sendCardSuccess]: () => true,
		[sendCardFailure]: () => false,
		[fetchCardRequest]: () => false,
		[setSuccessMessageIsShown]: (_state, action) => action.payload,
		[fetchCardSuccess]: () => false,
		[fetchCardFailure]: () => false,
		[fetchLogout]: () => false
	},
	false
);

export default combineReducers({
	paymentMethodSaved,
	savedCard,
	error,
	successMessageIsShown
});
