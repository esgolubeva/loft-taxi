import axios from "axios";

export const getRouteRequest = action => {
	return axios
		.get(
			`https://loft-taxi.glitch.me/route?address1=${action.payload.from}&address2=${action.payload.to}`
		)
		.then(response => response.data);
};
