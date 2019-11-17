import reducer from "./reducer";

describe("card reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			cardInfo: {},
			error: null,
			paymentMethodSave: false
		});
	});

	it("should handle SEND_CARD_REQUEST", () => {
		expect(
			reducer([], {
				type: "SEND_CARD_REQUEST"
			})
		).toEqual({
			cardInfo: {},
			error: null,
			paymentMethodSave: false
		});
	});

	it("should handle SEND_CARD_SUCCESS", () => {
		expect(
			reducer([], {
				type: "SEND_CARD_SUCCESS",
				payload: { text: "text" }
			})
		).toEqual({
			cardInfo: { text: "text" },
			error: null,
			paymentMethodSave: true
		});
	});

	it("should handle SEND_CARD_FAILURE", () => {
		expect(
			reducer([], {
				type: "SEND_CARD_FAILURE",
				payload: "error text"
			})
		).toEqual({
			cardInfo: {},
			error: "error text",
			paymentMethodSave: false
		});
	});
});
