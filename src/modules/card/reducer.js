import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
	sendCardFailure,
	sendCardSuccess,
	sendCardRequest,
	fetchCardRequest,
	fetchCardSuccess,
	fetchCardFailure,
	setPaymentMethodSaved
} from "./actions";

import { fetchLogout } from "../auth/actions";

const paymentMethodSaved = handleActions(
	{
		[sendCardRequest]: () => false,
		[sendCardSuccess]: () => true,
		[sendCardFailure]: () => false,
		[fetchCardRequest]: () => false,
		[fetchCardSuccess]: () => false,
		[fetchCardFailure]: () => false,
		[setPaymentMethodSaved]: () => true,
		[fetchLogout]: () => false
	},
	false
);

const savedCard = handleActions(
	{
		[sendCardRequest]: () => {},
		[sendCardSuccess]: (_state, action) => action.payload,
		[fetchCardSuccess]: (_state, action) => action.payload,
		[fetchLogout]: () => null
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

export default combineReducers({
	paymentMethodSaved,
	savedCard,
	error
});
