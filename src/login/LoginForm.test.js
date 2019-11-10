// import React from "react";
// import { render, fireEvent } from "@testing-library/react";
// import { LoginForm } from "./LoginForm";
// import { AuthContext } from "../auth";

// describe("LoginForm", () => {
// 	describe("on submit", () => {
// 		it("should set Map page and login()", () => {
// 			let setPageMock = jest.fn();
// 			let loginMock = jest.fn();

// 			let authHandlerStub = {
// 				login: loginMock,
// 				isLoggedIn: true
// 			};

// 			let { getByText } = render(
// 				<AuthContext.Provider value={authHandlerStub}>
// 					<LoginForm setPage={setPageMock} />
// 				</AuthContext.Provider>
// 			);

// 			let button = getByText("Войти", {
// 				selector: "span"
// 			}).closest("button");

// 			fireEvent.click(button);

// 			expect(setPageMock.mock.calls.length).toBe(1);
// 			expect(setPageMock.mock.calls[0][0]).toBe("map");
// 			expect(loginMock.mock.calls.length).toBe(1);
// 		});
// 	});
// 	describe("on Зарегистрируйтесь link click", () => {
// 		it("should set Signup page", () => {
// 			let setPageMock = jest.fn();

// 			let { getByText } = render(<LoginForm setPage={setPageMock} />);

// 			let button = getByText("Зарегистрируйтесь");

// 			fireEvent.click(button);

// 			expect(setPageMock.mock.calls.length).toBe(1);
// 			expect(setPageMock.mock.calls[0][0]).toBe("signup");
// 		});
// 	});
// });
