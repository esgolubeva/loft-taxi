import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
	fetchAddressRequest,
	fetchAddressSuccess,
	fetchAddressFailure
} from "./actions";

const addressList = handleActions(
	{
		[fetchAddressSuccess]: (_state, action) => action.payload
	},
	[]
);

const error = handleActions(
	{
		[fetchAddressRequest]: () => null,
		[fetchAddressFailure]: (_state, action) => action.payload,
		[fetchAddressSuccess]: () => null
	},
	null
);

const isLoading = handleActions(
	{
		[fetchAddressRequest]: () => true,
		[fetchAddressFailure]: () => false,
		[fetchAddressSuccess]: () => false
	},
	false
);

export default combineReducers({
	addressList,
	error,
	isLoading
});
