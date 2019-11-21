import React from "react";
import { fireEvent } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../modules";
import OrderForm from "./OrderForm";

describe("OrderForm", () => {
	it("renders correctly", () => {
		let store = createStore(rootReducer);

		let { getByTestId, getByText } = renderWithProviders(<OrderForm />, store);
		expect(getByTestId("from")).toBeTruthy();
		expect(getByTestId("to")).toBeTruthy();
		expect(getByText("Вызвать такси")).toBeTruthy();

		let button = getByText("Вызвать такси");
		fireEvent.submit(button);
	});
});
