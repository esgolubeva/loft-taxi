import { combineReducers } from "redux";
import auth from "./auth";
import card from "./card";
import address from "./address";
import route from "./route";
import { logout } from "./auth/actions";

const rootReducer = combineReducers({
	auth,
	card,
	address,
	route
});

export default (state, action) => {
	if (action.type === logout.toString()) {
		state = undefined;
	}

	return rootReducer(state, action);
};
