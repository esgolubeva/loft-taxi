import React from "react";

import { render } from "@testing-library/react";
import { currentAppPage, App } from "./App";
import reducer from "./modules";
import { createStore } from "redux";
import { Provider } from "react-redux";

function renderWithRedux(
	ui,
	{ initialState, store = createStore(reducer, initialState) } = {}
) {
	return {
		...render(<Provider store={store}>{ui}</Provider>),
		// adding `store` to the returned utilities to allow us
		// to reference it in our tests (just try to avoid using
		// this to test implementation details).
		store
	};
}

describe("App", () => {
	it("renders without crashing", () => {
		renderWithRedux(<App />);
	});
});

// 	it.each(["map", "profile", "login", "signup"])(
// 		"should correctly render %s page",
// 		pageName => {
// 			let setPage = jest.fn();
// 			let page = currentAppPage(pageName, setPage);
// 			let { queryByTestId } = render(page);
// 			expect(queryByTestId(pageName)).toBeTruthy();
// 		}
// 	);
// });
