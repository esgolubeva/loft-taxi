import React, { useContext } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { AuthContext } from "../auth";

const useStyles = makeStyles(theme => ({
	title: {
		flexGrow: 1
	}
}));

export const Header = props => {
	const classes = useStyles();
	const context = useContext(AuthContext);

	const onButtonClick = name => {
		if (context.isLoggedIn) {
			return props.setPage(name);
		}
		return props.setPage("accessDenied");
	};

	const onLogoutButtonClick = () => {
		context.logout();
		props.setPage("login");
	};

	let loginButton = (
		<Button onClick={() => props.setPage("login")} color="inherit">
			Войти
		</Button>
	);

	let logoutButton = (
		<Button onClick={onLogoutButtonClick} color="inherit">
			Выйти
		</Button>
	);

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					Loft Taxi
				</Typography>
				<Button onClick={() => onButtonClick("map")} color="inherit">
					Карта
				</Button>
				<Button onClick={() => onButtonClick("profile")} color="inherit">
					Профиль
				</Button>
				{context.isLoggedIn ? logoutButton : loginButton}
			</Toolbar>
		</AppBar>
	);
};

Header.propTypes = {
	setPage: PropTypes.func
};
