import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
	fetchCardRequest,
	fetchCardSuccess,
	fetchCardFailure
} from "./actions";

const cardInfo = handleActions(
	{
		[fetchCardSuccess]: (_state, action) => action.payload
	},
	{}
);

const error = handleActions(
	{
		[fetchCardRequest]: () => null,
		[fetchCardFailure]: (_state, action) => action.payload,
		[fetchCardSuccess]: () => null
	},
	null
);

export default combineReducers({
	cardInfo,
	error
});
