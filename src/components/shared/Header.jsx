import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Logo } from "loft-taxi-mui-theme";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core/";

import { Link as RouterLink, withRouter } from "react-router-dom";

import { fetchLogout } from "../../modules/auth";

const NavLink = React.forwardRef((props, ref) => (
	<RouterLink innerRef={ref} {...props} />
));

const useStyles = makeStyles(() => ({
	bar: {
		backgroundColor: "#fff"
	},
	title: {
		flexGrow: 1
	}
}));

const Header = withRouter(props => {
	const classes = useStyles();

	const { fetchLogout } = props;

	const onLogoutButtonClick = () => {
		fetchLogout();
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

Header.propTypes = {
	setPage: PropTypes.func
};

const mapStateToProps = state => state;

const mapDispatchToProps = { fetchLogout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
