import React from "react";
import { fireEvent, wait } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";

import { App } from "../../App";
import rootReducer from "../../modules";
import { sendAuthRequest, sendAuthSuccess } from "../../modules/auth";

describe("LoginForm", () => {
	it("should on Войти button click redirect to /map", () => {
		let store = createStore(
			rootReducer,
			applyMiddleware(store => next => action => {
				if (action.type === sendAuthRequest.toString()) {
					expect(action.payload).toStrictEqual({
						email: "email@example.com",
						password: "password"
					});
					return store.dispatch(sendAuthSuccess());
				}
				return next(action);
			})
		);

		let { getByTestId } = renderWithProviders(<App />, store);

		fireEvent.change(getByTestId("inputName"), {
			target: { value: "email@example.com" }
		});

		fireEvent.change(getByTestId("inputPassword"), {
			target: { value: "password" }
		});

		let loginButton = getByTestId("buttonLogin");
		fireEvent.submit(loginButton);

		return wait(() => getByTestId("map"));
	});
});
