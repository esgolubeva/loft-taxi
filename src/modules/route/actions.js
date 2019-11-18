import { createAction } from "redux-actions";

export const fetchRouteRequest = createAction("FETCH_ROUTE_REQUEST");
export const fetchRouteSuccess = createAction("FETCH_ROUTE_SUCCESS");
export const fetchRouteFailure = createAction("FETCH_ROUTE_FAILURE");

export const resetRoute = createAction("RESET_ROUTE");
