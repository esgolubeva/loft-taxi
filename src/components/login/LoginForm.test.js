import React from "react";
import { fireEvent, wait } from "@testing-library/react";
import { App } from "../../App";
import LoginForm from "./LoginForm";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../modules";
import { fetchAuthRequest, fetchAuthSuccess } from "../../modules/auth";

describe("LoginForm", () => {
	it("should submit form on button click and redirect to map page", () => {
		let store = createStore(
			rootReducer,
			applyMiddleware(store => next => action => {
				if (action.type === fetchAuthRequest.toString()) {
					return Promise.resolve();
				}
				return next(action);
			})
		);

		let { getByTestId} = renderWithProviders(<App />, store);

		fireEvent.change(getByTestId("inputName"), {
			target: { value: "email@example.com" }
		});

		fireEvent.change(getByTestId("inputPassword"), {
			target: { value: "password" }
		});

		let loginButton = getByTestId("buttonLogin");
		fireEvent.submit(loginButton);
		jest.setTimeout(10000);
		return wait(() => (getByTestId("map"));
	});
});
