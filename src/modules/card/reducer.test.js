import reducer from "./reducer";

describe("card reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			cardInfo: {},
			error: null,
			isSaved: false
		});
	});

	it("should handle FETCH_CARD_REQUEST", () => {
		expect(
			reducer([], {
				type: "FETCH_CARD_REQUEST"
			})
		).toEqual({
			cardInfo: {},
			error: null,
			isSaved: false
		});
	});

	it("should handle FETCH_CARD_SUCCESS", () => {
		expect(
			reducer([], {
				type: "FETCH_CARD_SUCCESS",
				payload: {"text" : "text"}
			})
		).toEqual({
			cardInfo: {"text" : "text"},
			error: null,
			isSaved: true
		});
	});

	it("should handle FETCH_CARD_FAILURE", () => {
		expect(
			reducer([], {
				type: "FETCH_CARD_FAILURE",
				payload: "error text"
			})
		).toEqual({
			cardInfo: {},
			error: "error text",
			isSaved: false
		});
	});

	it("should handle FETCH_HIDE_SAVE_MESSAGE", () => {
		expect(
			reducer([], {
				type: "FETCH_HIDE_SAVE_MESSAGE"
			})
		).toEqual({
			cardInfo: {},
			error: null,
			isSaved: false
		});
	});
});
