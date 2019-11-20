import React from "react";
import { fireEvent, wait } from "@testing-library/react";
// import { App } from "../../App";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../modules";
import { fetchRouteRequest, fetchRouteSuccess } from "../../modules/route";
import OrderForm from "./OrderForm";

describe("OrderForm", () => {
	it("renders correctly", () => {
		let store = createStore(
			rootReducer,
			applyMiddleware(store => next => action => {
				if (action.type === fetchRouteRequest.toString()) {
					expect(action.payload).toStrictEqual({
						address1: "Шаверма на Невском",
						address2: "Волковское кладбище"
					});
					return store.dispatch(sendAuthSuccess());
				}
				return next(action);
			})
		);

		let { getByTestId, getByText } = renderWithProviders(<OrderForm />, store);
		expect(getByTestId("from")).toBeTruthy();
		expect(getByTestId("to")).toBeTruthy();
		expect(getByText("Вызвать такси")).toBeTruthy();

		// fireEvent.change(getByTestId("from"), {
		// 	target: { value: "Шаверма на Невском" }
		// });

		// fireEvent.change(getByTestId("to"), {
		// 	target: { value: "Волковское кладбище" }
		// });

		let button = getByText("Вызвать такси");
		fireEvent.submit(button);
	});

	// it("should on Войти button click redirect to map page", () => {
	// 	let store = createStore(
	// 		rootReducer,
	// 		applyMiddleware(store => next => action => {
	// 			if (action.type === sendAuthRequest.toString()) {
	// 				expect(action.payload).toStrictEqual({
	// 					email: "email@example.com",
	// 					password: "password"
	// 				});
	// 				return store.dispatch(sendAuthSuccess());
	// 			}
	// 			return next(action);
	// 		})
	// 	);

	// 	let { getByTestId } = renderWithProviders(<App />, store);

	// 	fireEvent.change(getByTestId("inputName"), {
	// 		target: { value: "email@example.com" }
	// 	});

	// 	fireEvent.change(getByTestId("inputPassword"), {
	// 		target: { value: "password" }
	// 	});

	// 	let loginButton = getByTestId("buttonLogin");
	// 	fireEvent.submit(loginButton);

	// 	return wait(() => getByTestId("map"));
	// });
});
