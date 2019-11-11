import React from "react";
import { fireEvent, wait } from "@testing-library/react";
import { App } from "../../App";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../modules";
import { fetchAuthRequest, fetchAuthSuccess } from "../../modules/auth";

describe("LoginForm", () => {
	it("should on Войти button click redirect to map page", () => {
		let store = createStore(
			rootReducer,
			applyMiddleware(store => next => action => {
				if (action.type === fetchAuthRequest.toString()) {
					expect(action.payload).toStrictEqual({
						email: "email@example.com",
						password: "password"
					});
					return store.dispatch(fetchAuthSuccess());
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
