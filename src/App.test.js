import React from "react";

import { render } from "@testing-library/react";
import { currentAppPage, App } from "./App";

describe("App", () => {
	it("renders without crashing", () => {
		render(<App />);
	});

	it.each(["map", "profile", "login", "signup", "access-denied"])(
		"should correctly render %s page",
		pageName => {
			let setPage = jest.fn();
			let page = currentAppPage(pageName, setPage);
			let { queryByTestId } = render(page);
			expect(queryByTestId(pageName)).toBeTruthy();
		}
	);
});
