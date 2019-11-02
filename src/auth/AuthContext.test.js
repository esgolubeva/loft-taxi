import { AuthHandler } from "./AuthContext";

describe("AuthHandler", () => {
	it("should toggle isLoggedIn", () => {
		let authHandler = new AuthHandler();

		authHandler.login();
		expect(authHandler.isLoggedIn).toBeTruthy();

		authHandler.logout();
		expect(authHandler.isLoggedIn).toBeFalsy();
	});
});
