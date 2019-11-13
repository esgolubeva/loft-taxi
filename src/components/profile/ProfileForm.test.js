import React from "react";
import { fireEvent, wait } from "@testing-library/react";
import ProfileForm from "./ProfileForm";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../modules";
import { fetchCardRequest, fetchCardSuccess } from "../../modules/card";

describe("ProfileForm", () => {
	it("should submit form on button click", () => {
		let store = createStore(
			rootReducer,
			applyMiddleware(store => next => action => {
				if (action.type === fetchCardRequest.toString()) {
					return Promise.resolve();
				}
				return next(action);
			})
		);

		let { getByText, getByPlaceholderText } = renderWithProviders(
			<ProfileForm />,
			store
		);

		fireEvent.change(getByPlaceholderText("0000 0000 0000 0000"), {
			target: { value: "1111 1111 1111 1111" }
		});

		fireEvent.change(getByPlaceholderText("12/34"), {
			target: { value: "02/22" }
		});

		fireEvent.change(getByPlaceholderText("USER NAME"), {
			target: { value: "John Doe" }
		});

		fireEvent.change(getByPlaceholderText("123"), {
			target: { value: "321" }
		});

		let saveButton = getByText("Сохранить");

		fireEvent.submit(saveButton);

		return wait(() => getByText("Данные карты сохранены."));
	});
});
