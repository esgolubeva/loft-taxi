import { recordSaga } from "../recordSaga";
import * as api from "./api";
import { fetchAddressRequestSaga } from "./sagas";
import {
	fetchAddressRequest,
	fetchAddressSuccess,
	fetchAddressFailure
} from "./actions";

describe.only("fetchAddressRequestSaga", () => {
	api.getAddressRequest = jest.fn();
	const error = new Error("test");

	it("should get addresses with success", async () => {
		api.getAddressRequest.mockImplementation(() =>
			Promise.resolve({
				payload: ["a", "b", "c"]
			})
		);

		const dispatched = await recordSaga(
			fetchAddressRequestSaga,
			fetchAddressRequest()
		);

		expect(dispatched).toContainEqual(fetchAddressSuccess());
	});

	it("should get addresses with failure", async () => {
		api.getAddressRequest.mockImplementation(() => {
			throw error;
		});

		const dispatched = await recordSaga(
			fetchAddressRequestSaga,
			fetchAddressRequest()
		);

		expect(dispatched).toContainEqual(fetchAddressFailure(error));
	});
});
