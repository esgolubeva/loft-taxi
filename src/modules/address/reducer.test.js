import reducer from "./reducer";

describe("address reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			addressList: [],
			error: null
		});
	});

	it("should handle FETCH_ADDRESS_REQUEST", () => {
		expect(
			reducer({}, {
				type: "FETCH_ADDRESS_REQUEST"
			})
		).toEqual({
			addressList: [],
			error: null
		});
	});

	it("should handle FETCH_ADDRESS_SUCCESS", () => {
		expect(
			reducer({}, {
				type: "FETCH_ADDRESS_SUCCESS",
				payload: [1, 2, 3]
			})
		).toEqual({
			addressList: [1, 2, 3],
			error: null
		});
	});

	it("should handle FETCH_ADDRESS_FAILURE", () => {
		expect(
			reducer({}, {
				type: "FETCH_ADDRESS_FAILURE",
				payload: "error text"
			})
		).toEqual({
			addressList: [],
			error: "error text"
		});
	});
});
