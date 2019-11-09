import React from "react";

import Background from "../img/bg/auth-bg.jpg";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
	authBg: {
		backgroundColor: "#000",
		backgroundImage: `url(${Background})`,
		backgroundSize: "cover"
	},
	container: {
		minHeight: "calc(100vh - 71px)", // TODO: fix header height
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between"
	}
}));

export const ProfilePage = props => {
	const classes = useStyles();
	return (
		<Box className={classes.authBg}>
			<Container className={classes.container}>{props.children}</Container>
		</Box>
	);
};
