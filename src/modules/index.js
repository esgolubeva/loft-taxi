import { combineReducers } from "redux";
import auth from "./auth";
import card from "./card";
import address from "./address";
import route from "./route";
import { fetchLogout } from "./auth/actions";

const rootReducer = combineReducers({
	auth,
	card,
	address,
	route
});

export default (state, action) => {
	if (action.type === fetchLogout.toString()) {
		state = undefined;
	}

	return rootReducer(state, action);
};
