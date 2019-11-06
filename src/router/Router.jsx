import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "../auth";

import { Map } from "../map";
import { Login } from "../login";
import { Signup } from "../signup";
import { Profile } from "../profile";

export const Router = () => {
	const context = useContext(AuthContext);
	console.log(context.isLoggedIn);
	let loginPath = "/login";
	let PrivateRoute = ({ component: RouteComponent }) => (
		<Route
			render={routeProps =>
				context.isLoggedIn ? (
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
		</Switch>
	);
};
