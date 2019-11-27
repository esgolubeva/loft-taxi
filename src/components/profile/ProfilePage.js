import React from "react";
import PropTypes from "prop-types";

import Background from "../../img/bg/auth-bg.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box, Paper, Typography } from "@material-ui/core/";

const useStyles = makeStyles(() => ({
	authBg: {
		backgroundColor: "#000",
		backgroundImage: `url(${Background})`,
		backgroundSize: "cover"
	},
	container: {
		minHeight: "calc(100vh - 71px)",
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
						</Box>
						{props.children}
					</Container>
				</Paper>
			</Container>
		</Box>
	);
};

ProfilePage.propTypes = {
	children: PropTypes.node.isRequired
};
