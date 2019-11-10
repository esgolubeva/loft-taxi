import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
	fetchCardRequest,
	fetchCardSuccess,
	fetchCardFailure,
	fetchHideSaveMessage
} from "./actions";

const cardInfo = handleActions(
	{
		[fetchCardSuccess]: (_state, action) => action.payload
	},
	{}
);

const isSaved = handleActions(
	{
		[fetchCardRequest]: () => false,
		[fetchCardFailure]: () => false,
		[fetchCardSuccess]: () => true,
		[fetchHideSaveMessage]: () => false
	},
	false
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
	isSaved,
	error
});