import reducer from "./reducer";

describe("card reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			savedCard: {},
			error: null,
			paymentMethodSaved: false,
			successMessageIsShown: false
		});
	});

	it("should handle SEND_CARD_REQUEST", () => {
		expect(
			reducer(
				{},
				{
					type: "SEND_CARD_REQUEST"
				}
			)
		).toEqual({
			savedCard: {},
			error: null,
			paymentMethodSaved: false,
			successMessageIsShown: false
		});
	});

	it("should handle FETCH_CARD_REQUEST", () => {
		expect(
			reducer(
				{},
				{
					type: "FETCH_CARD_REQUEST"
				}
			)
		).toEqual({
			savedCard: {},
			error: null,
			paymentMethodSaved: false,
			successMessageIsShown: false
		});
	});

	it("should handle SEND_CARD_SUCCESS", () => {
		expect(
			reducer(
				{},
				{
					type: "SEND_CARD_SUCCESS",
					payload: { text: "text" }
				}
			)
		).toEqual({
			savedCard: { text: "text" },
			error: null,
			paymentMethodSaved: true,
			successMessageIsShown: true
		});
	});

	it("should handle FETCH_CARD_SUCCESS", () => {
		expect(
			reducer(
				{},
				{
					type: "FETCH_CARD_SUCCESS",
					payload: { text: "text" }
				}
			)
		).toEqual({
			savedCard: { text: "text" },
			error: null,
			paymentMethodSaved: true,
			successMessageIsShown: false
		});
	});

	it("should handle SEND_CARD_FAILURE", () => {
		expect(
			reducer(
				{},
				{
					type: "SEND_CARD_FAILURE",
					payload: "error text"
				}
			)
		).toEqual({
			savedCard: {},
			error: "error text",
			paymentMethodSaved: false,
			successMessageIsShown: false
		});
	});

	it("should handle FETCH_CARD_FAILURE", () => {
		expect(
			reducer(
				{},
				{
					type: "FETCH_CARD_FAILURE",
					payload: "error text"
				}
			)
		).toEqual({
			savedCard: {},
			error: "error text",
			paymentMethodSaved: false,
			successMessageIsShown: false
		});
	});

	it("should handle SET_SUCCESS_MESSAGE_IS_SHOWN after FETCH_CARD_SUCCESS", () => {
		expect(
			reducer(
				{},
				{
					type: "FETCH_CARD_SUCCESS",
					payload: { text: "text" }
				},
				{
					type: "SET_SUCCESS_MESSAGE_IS_SHOWN",
					payload: false
				}
			)
		).toEqual({
			savedCard: { text: "text" },
			error: null,
			paymentMethodSaved: true,
			successMessageIsShown: false
		});
	});
});
