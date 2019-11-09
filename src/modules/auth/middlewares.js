import {
	fetchAuthFailure,
	fetchAuthSuccess,
	fetchAuthRequest,
	fetchLogout
} from "./actions";

export const authFetchMiddleware = store => next => action => {
	if (action.type === fetchAuthRequest.toString()) {
		fetch("https://loft-taxi.glitch.me/auth", {
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
				store.dispatch(fetchAuthSuccess(data));
				window.localStorage.setItem("token", data.token);
			})
			.catch(error => {
				store.dispatch(fetchAuthFailure(error));
			});
	} else if (action.type === fetchLogout.toString()) {
		window.localStorage.setItem("token", null);
	}
	return next(action);
};
