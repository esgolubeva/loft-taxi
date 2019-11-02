import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { Header } from "./shared/Header";
import { Map } from "./map";
import { Login } from "./login";
import { Signup } from "./signup";
import { Profile } from "./profile";
import { AccessDenied } from "./access-denied";
import { theme } from "loft-taxi-mui-theme";
import { AuthProvider } from "./auth";

export const currentAppPage = (currentPageName, setPage) => {
	switch (currentPageName) {
		case "map":
			return <Map />;
		case "signup":
			return <Signup setPage={setPage} />;
		case "profile":
			return <Profile />;
		case "access-denied":
			return <AccessDenied />;
		default:
			return <Login setPage={setPage} />;
	}
};

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

	render() {
		let page = currentAppPage(this.state.page, this.setPage);

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
