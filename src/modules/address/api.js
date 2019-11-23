import axios from "axios";

export const getAddressRequest = path => {
	return axios.get(`https://loft-taxi.glitch.me/${path}`).then(response => {
		return response.data;
	});
};