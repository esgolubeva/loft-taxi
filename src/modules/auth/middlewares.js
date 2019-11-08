import {
	fetchAuthFailure,
	fetchAuthSuccess,
	fetchAuthRequest
} from "./actions";

export const authFetchMiddleware = store => next => action => {
	let body = JSON.stringify(store.getState().auth.userInfo);
	if (action.type === fetchAuthRequest.toString()) {
		fetch("https://loft-taxi.glitch.me/auth", {
			method: "POST",
			body: body,
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
				store.dispatch(fetchAuthSuccess(data));
			})
			.catch(error => {
				store.dispatch(fetchAuthFailure(error));
			});
	}
	return next(action);
};
