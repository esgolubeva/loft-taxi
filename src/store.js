import { createStore, compose, applyMiddleware } from "redux";
// import { authFetchMiddleware, registerFetchMiddleware } from "./modules/auth/middlewares";
// import { cardFetchMiddleware } from "./modules/card/middlewares";
import rootReducer from "./modules";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./modules/rootSaga";
// import { handleAuth } from "./modules/auth/sagas";

const sagaMiddleware = createSagaMiddleware();

const createAppStore = () => {
	const store = createStore(
		rootReducer,
		compose(
			// applyMiddleware(authFetchMiddleware),
			// applyMiddleware(registerFetchMiddleware),
			// applyMiddleware(cardFetchMiddleware),
			applyMiddleware(sagaMiddleware),
			window.__REDUX_DEVTOOLS_EXTENSION__
				? window.__REDUX_DEVTOOLS_EXTENSION__()
				: noop => noop
		)
	);
	sagaMiddleware.run(rootSaga);
	return store;
};

export default createAppStore;
