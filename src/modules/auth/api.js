import axios from "axios";

export const postAuthRequest = (payload, path) => {
	return axios
		.post(`https://loft-taxi.glitch.me/${path}`, payload)
		.then(response => {
			if (!response.data.success) {
				throw Error(response.data.error);
			}
			return response.data;
		});
};

export const saveToken = (token) => {
	window.localStorage.setItem("token", token);
}