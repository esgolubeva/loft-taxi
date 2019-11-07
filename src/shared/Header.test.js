import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { Header } from "./Header";
import { AuthContext } from "../auth";

describe("Header", () => {
	it.each`
		buttonText   | isLoggedIn | expectedPage
		${"Карта"}   | ${true}    | ${"map"}
		${"Профиль"} | ${true}    | ${"profile"}
	`(
		"$buttonText button should set $expectedPage page on click if isLoggedIn=$isLoggedIn",
		({ buttonText, isLoggedIn, expectedPage }) => {
			let setPageMock = jest.fn();

			let authHandlerStub = {
				isLoggedIn: isLoggedIn
			};

			let { container, getByText } = render(
				<AuthContext.Provider value={authHandlerStub}>
					<Header setPage={setPageMock} />
				</AuthContext.Provider>
			);

			fireEvent.click(getByText(buttonText));
			expect(setPageMock.mock.calls.length).toBe(1);
			expect(setPageMock.mock.calls[0][0]).toBe(expectedPage);
		}
	);

	it("should have Выйти button if isLoggedIn=true and logout() on click", () => {
		let setPageMock = jest.fn();
		let logoutMock = jest.fn();

		let authHandlerStub = {
			logout: logoutMock,
			isLoggedIn: true
		};

		let { getByText } = render(
			<AuthContext.Provider value={authHandlerStub}>
				<Header setPage={setPageMock} />
			</AuthContext.Provider>
		);

		let button = getByText("Выйти");

		fireEvent.click(button);

		expect(setPageMock.mock.calls.length).toBe(1);
		expect(setPageMock.mock.calls[0][0]).toBe("login");
		expect(logoutMock.mock.calls.length).toBe(1);
	});
});
