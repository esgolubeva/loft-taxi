import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
	fetchRouteRequest,
	fetchRouteSuccess,
	fetchRouteFailure,
	resetRoute
} from "./actions";

const routeCoords = handleActions(
	{
		[fetchRouteRequest]: () => [],
		[fetchRouteFailure]: () => [],
		[fetchRouteSuccess]: (_state, action) => action.payload,
		[resetRoute]: () => []
	},
	[]
);

const orderIsAccepted = handleActions(
	{
		[fetchRouteRequest]: () => false,
		[fetchRouteFailure]: () => false,
		[fetchRouteSuccess]: () => true,
		[resetRoute]: () => false
	},
	false
);

const error = handleActions(
	{
		[fetchRouteRequest]: () => null,
		[fetchRouteFailure]: (_state, action) => action.payload,
		[fetchRouteSuccess]: () => null,
		[resetRoute]: () => null
	},
	null
);

export default combineReducers({
	routeCoords,
	error,
	orderIsAccepted
});
