import { recordSaga } from "../recordSaga";
import * as api from "./api";
import { sendCardRequestSaga, fetchCardRequestSaga } from "./sagas";
import {
	sendCardRequest,
	sendCardSuccess,
	sendCardFailure,
	fetchCardRequest,
	fetchCardSuccess,
	fetchCardFailure
} from "./actions";

describe.only("sendCardRequestSaga", () => {
	api.postCardRequest = jest.fn();
	const error = new Error("test");

	it("should post card with success", async () => {
		api.postCardRequest.mockImplementation(() =>
			Promise.resolve({
				success: true
			})
		);

		const payload = {
			test: "test"
		};

		const dispatched = await recordSaga(
			sendCardRequestSaga,
			sendCardRequest(payload)
		);

		expect(dispatched).toContainEqual(sendCardSuccess(payload));
	});

	it("should post card with failure", async () => {
		api.postCardRequest.mockImplementation(() => {
			throw error;
		});

		const payload = {
			test: "test"
		};

		const dispatched = await recordSaga(
			sendCardRequestSaga,
			sendCardRequest(payload)
		);

		expect(dispatched).toContainEqual(sendCardFailure(error));
	});
});

describe.only("fetchCardRequestSaga", () => {
	api.getCardRequest = jest.fn();
	const error = new Error("test");

	it("should get card with success", async () => {
		api.getCardRequest.mockImplementation(() =>
			Promise.resolve({
				test: "test"
			})
		);

		const dispatched = await recordSaga(
			fetchCardRequestSaga,
			fetchCardRequest()
		);

		expect(dispatched).toContainEqual(
			fetchCardSuccess({
				test: "test"
			})
		);
	});

	it("should get card with failure", async () => {
		api.getCardRequest.mockImplementation(() => {
			throw error;
		});

		const dispatched = await recordSaga(
			fetchCardRequestSaga,
			fetchCardRequest()
		);

		expect(dispatched).toContainEqual(fetchCardFailure(error));
	});
});
