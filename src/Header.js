import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export class Header extends React.Component {
	render() {
		return (
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">Loft Taxi</Typography>
					<Button onClick={() => this.props.handler("map")}>Карта</Button>
					<Button onClick={() => this.props.handler("profile")}>Профиль</Button>
					<Button onClick={() => this.props.handler("login")}>Войти</Button>
				</Toolbar>
			</AppBar>
		);
	}
}
