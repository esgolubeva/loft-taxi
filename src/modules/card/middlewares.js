import {
	fetchCardFailure,
	fetchCardSuccess,
	fetchCardRequest
} from "./actions";

export const cardFetchMiddleware = store => next => action => {
	if (action.type === fetchCardRequest.toString()) {
		return fetch("https://loft-taxi.glitch.me/card", {
			method: "POST",
			body: JSON.stringify(action.payload),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => {
				if (!data.success) {
					throw Error(data);
				}
				return data;
			})
			.then(data => {
				store.dispatch(fetchCardSuccess(action.payload));
				return data;
			})
			.catch(error => {
				store.dispatch(fetchCardFailure(error));
			});
	}
	return next(action);
};
