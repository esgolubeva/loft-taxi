import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { Logo } from "loft-taxi-mui-theme";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core/";

import { logout } from "../../modules/auth";
import { NavLink } from "./NavLink";

const useStyles = makeStyles(() => ({
	bar: {
		backgroundColor: "#fff"
	},
	title: {
		flexGrow: 1
	}
}));

const Header = React.memo(props => {
	const classes = useStyles();
	const { logout } = props;

	const onLogoutButtonClick = () => {
		logout();
	};

	if (props.location.pathname.match(/(\/login|\/signup)/)) {
		return null;
	}

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
});

Header.displayName = "Header";
Header.propTypes = {
	logout: PropTypes.func,
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
};

const mapStateToProps = state => state;

const mapDispatchToProps = { logout };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
