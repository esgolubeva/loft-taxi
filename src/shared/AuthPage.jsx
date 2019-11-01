import React from "react";

import { useAuthPageStyles } from "../shared/styles";

import { Logo } from "loft-taxi-mui-theme";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

export const AuthPage = props => {
	const classes = useAuthPageStyles();
	return (
		<div className={classes.authBg}>
			<Container>
				<Box className={classes.container}>
					<Box className={classes.logoContainer}>
						<Logo white animated />
					</Box>
					{props.children}
				</Box>
			</Container>
		</div>
	);
};
