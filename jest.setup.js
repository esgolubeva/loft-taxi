import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import 'mutationobserver-shim';

// See: https://github.com/mapbox/mapbox-gl-js/issues/3436#issuecomment-485535598
jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
	GeolocateControl: jest.fn(),
	Map: jest.fn(() => ({
		addControl: jest.fn(),
		on: jest.fn(),
		remove: jest.fn()
	})),
	NavigationControl: jest.fn()
}));

global.renderWithProviders = function(children, store) {
	let rendered = render(
		<MemoryRouter>
			<Provider store={store}>{children}</Provider>
		</MemoryRouter>
	);

	return {
		...rendered,
		store
	};
};
