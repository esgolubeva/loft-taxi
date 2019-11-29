import React from "react";

import { Box, Typography, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { NavLink } from "../shared/NavLink";

export const useFormStyles = makeStyles(() => ({
	message: {
		marginTop: "30px",
		textAlign: "center"
	},
	button: {
		marginTop: "30px"
	}
}));

export const SuccessMessage = () => {
	const classes = useFormStyles();
	return (
		<Box className={classes.message}>
			<Typography variant="body1">Данные карты сохранены.</Typography>
			<Button
				className={classes.button}
				component={NavLink}
				to="/map"
				variant="contained"
				color="primary"
				size="large"
			>
				Заказать такси
			</Button>
		</Box>
	);
};
