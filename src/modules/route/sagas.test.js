import { recordSaga } from "../recordSaga";
import * as api from "./api";
import { fetchRouteRequestSaga } from "./sagas";
import {
	fetchRouteRequest,
	fetchRouteSuccess,
	fetchRouteFailure
} from "./actions";

describe.only("fetchRouteRequestSaga", () => {
	api.getRouteRequest = jest.fn();
	const error = new Error("test");

	it("should get route with success", async () => {
		api.getRouteRequest.mockImplementation(() =>
			Promise.resolve({
				payload: ["a", "b", "c"]
			})
		);

		const dispatched = await recordSaga(
			fetchRouteRequestSaga,
			fetchRouteRequest()
		);

		expect(dispatched).toContainEqual(fetchRouteSuccess({
			payload: ["a", "b", "c"]
		}));
	});

	it("should get route with failure", async () => {
		api.getRouteRequest.mockImplementation(() => {
			throw error;
		});

		const dispatched = await recordSaga(
			fetchRouteRequestSaga,
			fetchRouteRequest()
		);

		expect(dispatched).toContainEqual(fetchRouteFailure(error));
	});
});
