import React from "react";
import { fireEvent } from "@testing-library/react";
import { createStore } from "redux";

import { App } from "../../App";
import Order from "./Order";
import rootReducer from "../../modules";
import { sendAuthSuccess } from "../../modules/auth";
import { fetchCardSuccess } from "../../modules/card";
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
		it("renders Form correctly", () => {
			let store = createStore(rootReducer);
			store.dispatch(sendAuthSuccess());
			store.dispatch(fetchCardSuccess("payload"));
			let { getByText } = renderWithProviders(<Order />, store);

			expect(getByText("Откуда")).toBeTruthy();
			expect(getByText("Куда")).toBeTruthy();
		});
	});
	describe("if paymentMethodSaved = true and orderIsAccepted = true", () => {
		it("renders correctly and on Сделать новый заказ button click set orderIsAccepted = false", () => {
			let store = createStore(rootReducer);
			let { getByText } = renderWithProviders(<Order />, store);
			store.dispatch(sendAuthSuccess());
			store.dispatch(fetchCardSuccess("payload"));
			store.dispatch(fetchRouteSuccess());

			expect(getByText("Ваш заказ принят. Такси скоро приедет.")).toBeTruthy();
			expect(getByText("Сделать новый заказ")).toBeTruthy();

			fireEvent.click(getByText("Сделать новый заказ"));

			expect(getByText("Откуда")).toBeTruthy();
			expect(getByText("Куда")).toBeTruthy();
		});
	});
});
