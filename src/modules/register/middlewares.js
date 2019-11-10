import {
	fetchRegisterFailure,
	fetchRegisterSuccess,
	fetchRegisterRequest
} from "./actions";

export const registerFetchMiddleware = store => next => action => {
	if (action.type === fetchRegisterRequest.toString()) {
		fetch("https://loft-taxi.glitch.me/register", {
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
					console.log(data);
					throw Error(data);
				}
				console.log(data);
				return data;
			})
			.then(data => {
				store.dispatch(fetchRegisterSuccess(data));
				window.localStorage.setItem("token", data.token);
			})
			.catch(error => {
				store.dispatch(fetchRegisterFailure(error));
			});
	}
	return next(action);
};