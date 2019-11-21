import React from "react";
import { fireEvent } from "@testing-library/react";
import { createStore } from "redux";

import rootReducer from "../../modules";
import OrderForm from "./OrderForm";

describe("OrderForm", () => {
	it("renders correctly", () => {
		let store = createStore(rootReducer);
		let { getByTestId, getByText } = renderWithProviders(<OrderForm />, store);

		expect(getByTestId("from")).toBeTruthy();
		expect(getByTestId("to")).toBeTruthy();
		expect(getByText("Вызвать такси")).toBeTruthy();
		fireEvent.submit(getByText("Вызвать такси"));
	});
});
