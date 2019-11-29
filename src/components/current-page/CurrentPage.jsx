import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Map } from "../map";
import { Login } from "../login";
import { Signup } from "../signup";
import { Profile } from "../profile";
import { getIsLoggedIn } from "../../modules/auth";

const currentPage = props => {
	const { isLoggedIn } = props;
	const loginPath = "/login";

	const PrivateRoute = ({ component: RouteComponent }) => (
		<Route
			render={routeProps =>
				isLoggedIn ? (
					<RouteComponent {...routeProps} />
				) : (
					<Redirect to={loginPath} />
				)
			}
		/>
	);

	return (
		<Switch>
			<Route path="/login" component={Login} />
			<Route path="/signup" component={Signup} />
			<PrivateRoute path="/map" component={Map} />
			<PrivateRoute path="/profile" component={Profile} />
			<Redirect to="/map" />
		</Switch>
	);
};

currentPage.propTypes = {
	isLoggedIn: PropTypes.bool
};

const mapStateToProps = state => ({
	isLoggedIn: getIsLoggedIn(state)
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(currentPage);
