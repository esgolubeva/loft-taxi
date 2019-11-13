import { createStore, compose, applyMiddleware } from "redux";
import { authFetchMiddleware, registerFetchMiddleware } from "./modules/auth/middlewares";
import { cardFetchMiddleware } from "./modules/card/middlewares";
import rootReducer from "./modules";

const createAppStore = () => {
	const store = createStore(
		rootReducer,
		compose(
			applyMiddleware(authFetchMiddleware),
			applyMiddleware(registerFetchMiddleware),
			applyMiddleware(cardFetchMiddleware),
			window.__REDUX_DEVTOOLS_EXTENSION__
				? window.__REDUX_DEVTOOLS_EXTENSION__()
				: noop => noop
		)
	);

	return store;
};

export default createAppStore;
