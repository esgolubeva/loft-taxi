import { combineReducers } from "redux";
import auth from "./auth";
import card from "./card";
import address from "./address";
import route from "./route";

export default combineReducers({
	auth,
	card,
	address,
	route
});
