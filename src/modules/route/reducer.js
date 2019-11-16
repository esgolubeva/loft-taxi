import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
	fetchRouteRequest,
	fetchRouteSuccess,
	fetchRouteFailure
} from "./actions";

const routePoints = handleActions(
	{
		[fetchRouteRequest]: (_state, action) => action.payload
	},
	{}
);

const route = handleActions(
	{
		[fetchRouteRequest]: () => [],
		[fetchRouteFailure]: () => [],
		[fetchRouteSuccess]: (_state, action) => action.payload
	},
	[]
);

const error = handleActions(
	{
		[fetchRouteRequest]: () => null,
		[fetchRouteFailure]: (_state, action) => action.payload,
		[fetchRouteSuccess]: () => null
	},
	null
);

export default combineReducers({
	routePoints,
	route,
	error
});
