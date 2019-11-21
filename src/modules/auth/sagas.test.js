import { recordSaga } from "../recordSaga";
import * as api from "./api";
import { sendAuthRequestSaga, sendRegisterRequestSaga } from "./sagas";
import {
	sendAuthRequest,
	sendAuthSuccess,
	sendAuthFailure,
	sendRegisterRequest,
	sendRegisterSuccess,
	sendRegisterFailure
} from "./actions";

describe.only("sendAuthRequestSaga", () => {
	api.postAuthRequest = jest.fn();
	api.saveToken = jest.fn();
	const error = new Error("test");

	it("should authorize with success", async () => {
		api.postAuthRequest.mockImplementation(() =>
			Promise.resolve({
				token: "abc"
			})
		);

		const payload = {
			email: "email@example.com",
			password: "password"
		};

		const dispatched = await recordSaga(
			sendAuthRequestSaga,
			sendAuthRequest(payload)
		);

		expect(dispatched).toContainEqual(sendAuthSuccess());
	});

	it("should authorize with failure", async () => {
		api.postAuthRequest.mockImplementation(() => {
			throw error;
		});

		const payload = {
			email: "email@example.com",
			password: "password"
		};

		const dispatched = await recordSaga(
			sendAuthRequestSaga,
			sendAuthRequest(payload)
		);

		expect(dispatched).toContainEqual(sendAuthFailure(error));
	});
});

describe.only("sendRegisterRequestSaga", () => {
	api.postAuthRequest = jest.fn();
	api.saveToken = jest.fn();
	const error = new Error("text");

	it("should register with success", async () => {
		api.postAuthRequest.mockImplementation(() =>
			Promise.resolve({
				token: "abc"
			})
		);

		const payload = {
			email: "email@example.com",
			name: "Name",
			surname: "Surname",
			password: "password"
		};

		const dispatched = await recordSaga(
			sendRegisterRequestSaga,
			sendRegisterRequest(payload)
		);

		expect(dispatched).toContainEqual(sendRegisterSuccess());
	});

	it("should register with failure", async () => {
		api.postAuthRequest.mockImplementation(() => {
			throw error;
		});

		const payload = {
			email: "email@example.com",
			name: "Name",
			surname: "Surname",
			password: "password"
		};

		const dispatched = await recordSaga(
			sendRegisterRequestSaga,
			sendRegisterRequest(payload)
		);

		expect(dispatched).toContainEqual(sendRegisterFailure(error));
	});
});
