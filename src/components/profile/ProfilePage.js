import React from "react";

import Background from "../../img/bg/auth-bg.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
		justifyContent: "center"
	},
	profile: {
		padding: "56px 0 72px",
		width: "945px",
		position: "relative"
	},
	profileContainer: {
		padding: "0 73px"
	}
}));

export const ProfilePage = props => {
	const classes = useStyles();

	return (
		<Box className={classes.authBg}>
			<Container className={classes.container}>
				<Paper className={classes.profile}>
					<Container className={classes.profileContainer}>
						<Box textAlign="center">
							<Typography variant="h4" component="h1">
								Профиль
							</Typography>
							<Typography variant="subtitle1">Способ оплаты</Typography>
						</Box>
						{props.children}
					</Container>
				</Paper>
			</Container>
		</Box>
	);
};
