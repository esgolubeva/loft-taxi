import React from "react";
import { fireEvent, wait } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./modules";
import { App } from "./App";
import { sendAuthSuccess } from "./modules/auth";
import { sendAuthRequest } from "./modules/auth";

describe("App", () => {
	it("renders profile page on Профиль button click in header", () => {
		let store = createStore(rootReducer);
		let { getByText, getByTestId } = renderWithProviders(<App />, store);
		store.dispatch(sendAuthSuccess());

		fireEvent.click(getByText("Профиль"));

		expect(getByTestId("profile")).toBeTruthy();
	});

	it("renders map page on Карта button click in header", () => {
		let store = createStore(rootReducer);
		let { getByText, getByTestId } = renderWithProviders(<App />, store);
		store.dispatch(sendAuthSuccess());

		fireEvent.click(getByText("Карта"));

		expect(getByTestId("map")).toBeTruthy();
	});

	it("renders login page on Выйти button click in header", () => {
		let store = createStore(rootReducer);
		let { getByText, getByTestId } = renderWithProviders(<App />, store);
		store.dispatch(sendAuthSuccess());

		fireEvent.click(getByText("Выйти"));

		expect(getByTestId("login")).toBeTruthy();
	});

	it("toggle login and signup pages on Войти and Зарегистрируйтесь link click", () => {
		let store = createStore(rootReducer);
		let { getByText, getByTestId } = renderWithProviders(<App />, store);

		fireEvent.click(getByText("Зарегистрируйтесь"));
		expect(getByTestId("signup")).toBeTruthy();

		fireEvent.click(getByText("Войти"));
		expect(getByTestId("login")).toBeTruthy();
	});
});
