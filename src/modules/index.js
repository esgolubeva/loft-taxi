import { combineReducers } from "redux";
import auth from "./auth";
import card from "./card";

export default combineReducers({
	auth,
	card
});
