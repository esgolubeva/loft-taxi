import axios from "axios";

export const postCardRequest = (action, path) => {
	const token = window.localStorage.getItem("token");
	return axios
		.post(`https://loft-taxi.glitch.me/${path}`, { ...action.payload, token })
		.then(response => {
			if (!response.data.success) {
				throw Error(response.data.error);
			}
			return response.data;
		});
};

export const getCardRequest = path => {
	const token = window.localStorage.getItem("token");
	return axios
		.get(`https://loft-taxi.glitch.me/${path}?token=${token}`)
		.then(response => {
			if (response.data.hasOwnProperty("error")) {
				throw Error(response.data.error);
			}
			return response.data;
		});
};
