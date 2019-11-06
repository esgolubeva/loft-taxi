import React, { useContext } from "react";
import PropTypes from "prop-types";

import { AuthContext } from "../auth";

import { Logo } from "loft-taxi-mui-theme";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { Link as RouterLink } from "react-router-dom";

const NavLink =  React.forwardRef((props, ref) => (
	<RouterLink innerRef={ref} {...props} />
));

const useStyles = makeStyles(theme => ({
	bar: {
		backgroundColor: "#fff"
	},
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
		return props.setPage("access-denied");
	};

	const onLogoutButtonClick = () => {
		context.logout();
		props.setPage("login");
	};
	return (
		<AppBar position="static" className={classes.bar}>
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					<Logo />
				</Typography>
				<Button component={NavLink} to="/map" color="inherit">
					Карта
				</Button>
				<Button component={NavLink} to="/profile" color="inherit">
					Профиль
				</Button>
				<Button onClick={onLogoutButtonClick} color="inherit">
					Выйти
				</Button>
			</Toolbar>
		</AppBar>
	);
};

Header.propTypes = {
	setPage: PropTypes.func
};
