import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./modules";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./modules/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const createAppStore = () => {
	const store = createStore(
		rootReducer,
		compose(
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
