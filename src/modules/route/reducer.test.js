import reducer from "./reducer";

describe("route reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			routeCoords: [],
			error: null,
			orderIsAccepted: false
		});
	});

	it("should handle FETCH_ROUTE_REQUEST", () => {
		expect(
			reducer({}, {
				type: "FETCH_ROUTE_REQUEST"
			})
		).toEqual({
			routeCoords: [],
			error: null,
			orderIsAccepted: false
		});
	});

	it("should handle FETCH_ROUTE_SUCCESS", () => {
		expect(
			reducer({}, {
				type: "FETCH_ROUTE_SUCCESS",
				payload: [1, 2, 3]
			})
		).toEqual({
			routeCoords: [1, 2, 3],
			error: null,
			orderIsAccepted: true
		});
	});

	it("should handle FETCH_ROUTE_FAILURE", () => {
		expect(
			reducer({}, {
				type: "FETCH_ROUTE_FAILURE",
				payload: "error text"
			})
		).toEqual({
			routeCoords: [],
			error: "error text",
			orderIsAccepted: false
		});
	});

	it("should handle RESET_ROUTE", () => {
		expect(
			reducer({}, {
				type: "RESET_ROUTE"
			})
		).toEqual({
			routeCoords: [],
			error: null,
			orderIsAccepted: false
		});
	});
});
