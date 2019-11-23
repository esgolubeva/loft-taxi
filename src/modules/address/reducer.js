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

export default combineReducers({
	addressList,
	error
});
