import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { Header } from "./Header";
import { AuthContext } from "../auth";

describe("Header", () => {
	it.each`
		buttonText   | isLoggedIn | expectedPage
		${"Карта"}   | ${true}    | ${"map"}
		${"Карта"}   | ${false}   | ${"access-denied"}
		${"Профиль"} | ${true}    | ${"profile"}
		${"Профиль"} | ${false}   | ${"access-denied"}
		${"Войти"}   | ${false}   | ${"login"}
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

	it("should have Выйти button if logged in and logout() on click", () => {
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

	it("test", () => {
		function a(b) {
			b(42, 24);
		}

		let c = jest.fn();

		a(c);

		expect(c.mock.calls.length).toBe(1);
		expect(c.mock.calls[0]).toEqual([42, 24]);
	});
});
