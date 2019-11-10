// import React from "react";
// import { render, fireEvent } from "@testing-library/react";
// import { SignupForm } from "./SignupForm";
// import { AuthContext } from "../auth";

// describe("SignupForm", () => {
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
// 					<SignupForm setPage={setPageMock} />
// 				</AuthContext.Provider>
// 			);

// 			let button = getByText("Зарегистрироваться", {
// 				selector: "span"
// 			}).closest("button");

// 			fireEvent.click(button);

// 			expect(setPageMock.mock.calls.length).toBe(1);
// 			expect(setPageMock.mock.calls[0][0]).toBe("map");
// 			expect(loginMock.mock.calls.length).toBe(1);
// 		});
// 	});
// 	describe("on Войти link click", () => {
// 		it("should set Login page", () => {
// 			let setPageMock = jest.fn();

// 			let { getByText } = render(<SignupForm setPage={setPageMock} />);

// 			let button = getByText("Войти");

// 			fireEvent.click(button);

// 			expect(setPageMock.mock.calls.length).toBe(1);
// 			expect(setPageMock.mock.calls[0][0]).toBe("login");
// 		});
// 	});
// });
