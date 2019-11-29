import React from "react";
import { fireEvent, wait } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";

import { App } from "../../App";
import ProfileForm from "./ProfileForm";
import rootReducer from "../../modules";
import { sendCardRequest, sendCardSuccess } from "../../modules/card";
import { sendAuthSuccess } from "../../modules/auth";

describe("ProfileForm", () => {
	describe("if successMessageIsShown = false", () => {
		it("renders correctly and should submit form on Сохранить button click", () => {
			const sendRequestMock = jest.fn();

			let store = createStore(
				rootReducer,
				applyMiddleware(store => next => action => {
					if (action.type === sendCardRequest.toString()) {
						sendRequestMock(action.payload);
					}
					return next(action);
				})
			);

			let { getByText, getByPlaceholderText } = renderWithProviders(
				<ProfileForm />,
				store
			);

			fireEvent.change(getByPlaceholderText("1234123412341234"), {
				target: { value: "1111111111111111" }
			});

			fireEvent.change(getByPlaceholderText("12/34"), {
				target: { value: new Date(1) }
			});

			fireEvent.change(getByPlaceholderText("USER NAME"), {
				target: { value: "John Doe" }
			});

			fireEvent.change(getByPlaceholderText("123"), {
				target: { value: "321" }
			});

			fireEvent.submit(getByText("Сохранить"));

			wait(
				() =>
					expect(sendRequestMock).toHaveBeenCalledWith({
						cardNumber: "1111111111111111",
						expiryDate: new Date(1),
						cardName: "John Doe",
						cvc: "321"
					}),
				1000
			);
		});
	});

	describe("if successMessageIsShown = true", () => {
		it("renders correctly and on Заказать такси button click redirect to /map", () => {
			let store = createStore(rootReducer);
			let { getByText, getByTestId } = renderWithProviders(<App />, store);
			store.dispatch(sendAuthSuccess());

			fireEvent.click(getByText("Профиль"));
			store.dispatch(sendCardSuccess());

			expect(getByText("Данные карты сохранены.")).toBeTruthy();
			expect(getByText("Заказать такси")).toBeTruthy();

			fireEvent.click(getByText("Заказать такси"));
			expect(getByTestId("map")).toBeTruthy();
		});
	});
});
