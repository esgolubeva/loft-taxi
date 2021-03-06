import reducer from "./reducer";

describe("auth reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			isLoggedIn: false,
			error: null
		});
	});

	it("should handle SEND_AUTH_REQUEST", () => {
		expect(
			reducer(
				{},
				{
					type: "SEND_AUTH_REQUEST"
				}
			)
		).toEqual({
			isLoggedIn: false,
			error: null
		});
	});

	it("should handle SEND_AUTH_SUCCESS", () => {
		expect(
			reducer(
				{},
				{
					type: "SEND_AUTH_SUCCESS"
				}
			)
		).toEqual({
			isLoggedIn: true,
			error: null
		});
	});

	it("should handle SEND_AUTH_FAILURE", () => {
		expect(
			reducer(
				{},
				{
					type: "SEND_AUTH_FAILURE",
					payload: "error text"
				}
			)
		).toEqual({
			isLoggedIn: false,
			error: "error text"
		});
	});

	it("should handle LOGOUT", () => {
		expect(
			reducer(
				{},
				{
					type: "LOGOUT"
				}
			)
		).toEqual({
			isLoggedIn: false,
			error: null
		});
	});

	it("should handle SEND_REGISTER_REQUEST", () => {
		expect(
			reducer(
				{},
				{
					type: "SEND_REGISTER_REQUEST"
				}
			)
		).toEqual({
			isLoggedIn: false,
			error: null
		});
	});

	it("should handle SEND_REGISTER_SUCCESS", () => {
		expect(
			reducer(
				{},
				{
					type: "SEND_REGISTER_SUCCESS"
				}
			)
		).toEqual({
			isLoggedIn: true,
			error: null
		});
	});

	it("should handle SEND_REGISTER_FAILURE", () => {
		expect(
			reducer(
				{},
				{
					type: "SEND_REGISTER_FAILURE",
					payload: "error text"
				}
			)
		).toEqual({
			isLoggedIn: false,
			error: "error text"
		});
	});
});
