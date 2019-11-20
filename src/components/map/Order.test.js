import React from "react";
import { fireEvent, wait } from "@testing-library/react";
import { App } from "../../App";
// import Order from "./Order";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../modules";
import { sendAuthSuccess } from "../../modules/auth";
import { fetchCardRequest, fetchCardSuccess } from "../../modules/card";
import { fetchRouteSuccess } from "../../modules/route";

describe("Order", () => {
	describe("if paymentMethodSaved = false", () => {
		it("renders correctly and on Перейти в Профиль button click redirect to /profile", () => {
			let store = createStore(rootReducer);
			let { getByText, getByTestId } = renderWithProviders(<App />, store);
			store.dispatch(sendAuthSuccess());

			expect(getByText("Заполните данные банковской карты")).toBeTruthy();
			expect(getByText("Перейти в Профиль")).toBeTruthy();

			fireEvent.click(getByText("Перейти в Профиль"));
			expect(getByTestId("profile")).toBeTruthy();
		});
    });
    describe("if paymentMethodSaved = true", () => {
		it("renders correctly", () => {
			let store = createStore(rootReducer);
			store.dispatch(sendAuthSuccess());
			store.dispatch(fetchCardSuccess("payload"));
			let { getByText } = renderWithProviders(<App />, store);

			expect(getByText("Откуда")).toBeTruthy();
			expect(getByText("Куда")).toBeTruthy();
		});
	});

	describe("if orderIsAccepted = true", () => {
		it("renders correctly", () => {
			let store = createStore(rootReducer);
			store.dispatch(sendAuthSuccess());
			store.dispatch(fetchCardSuccess("payload"));
			store.dispatch(fetchRouteSuccess("payload"));
			let { getByText } = renderWithProviders(<App />, store);

			expect(getByText("Ваш заказ принят")).toBeTruthy();
		});
	});
});
