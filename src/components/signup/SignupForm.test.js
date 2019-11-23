import React from "react";
import { fireEvent, wait } from "@testing-library/react";
import { App } from "../../App";
import SignupForm from "./SignupForm";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../modules";
import { sendRegisterRequest, sendRegisterSuccess } from "../../modules/auth";

describe("SignupForm", () => {
	it("should on Зарегистрироваться button click redirect to /map", () => {
		let store = createStore(
			rootReducer,
			applyMiddleware(store => next => action => {
				if (action.type === sendRegisterRequest.toString()) {
					expect(action.payload).toStrictEqual({
						email: "email@example.com",
						password: "password",
						name: "name",
						surname: "surname"
					});
					return store.dispatch(sendRegisterSuccess());
				}
				return next(action);
			})
		);

		let { getByTestId, getByText } = renderWithProviders(<App />, store);

		fireEvent.click(getByText("Зарегистрируйтесь"));
		expect(getByTestId("signup")).toBeTruthy();

		fireEvent.change(getByTestId("inputEmail"), {
			target: { value: "email@example.com" }
		});

		fireEvent.change(getByTestId("inputPassword"), {
			target: { value: "password" }
		});

		fireEvent.change(getByTestId("inputName"), {
			target: { value: "name" }
		});

		fireEvent.change(getByTestId("inputSurname"), {
			target: { value: "surname" }
		});

		let signupButton = getByText("Зарегистрироваться");
		fireEvent.submit(signupButton);

		return wait(() => getByTestId("map"));
	});
});
