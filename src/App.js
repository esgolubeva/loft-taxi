import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { Header } from "./shared/Header";
import { Map } from "./map";
import { Login } from "./login";
import { Signup } from "./signup";
import { Profile } from "./profile";
import { AccessDenied } from "./accessDenied";
import { theme } from "./shared/mui-theme";
import { AuthProvider } from "./auth";

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: "login"
		};
	}

	setPage = name => {
		this.setState({
			page: name
		});
	};

	currentPage = () => {
		switch (this.state.page) {
			case "map":
				return <Map />;
			case "signup":
				return <Signup setPage={this.setPage} />;
			case "profile":
				return <Profile />;
			case "accessDenied":
				return <AccessDenied />;
			default:
				return <Login setPage={this.setPage} />;
		}
	};

	render() {
		let page = this.currentPage();

		return (
			<AuthProvider>
				<MuiThemeProvider theme={theme}>
					<Header setPage={this.setPage} />
					{page}
				</MuiThemeProvider>
			</AuthProvider>
		);
	}
}
