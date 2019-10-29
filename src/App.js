import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { Header } from "./shared/Header";
import { Map } from "./map";
import { Login } from "./login";
import { Signup } from "./signup";
import { Profile } from "./profile";
import { theme } from "./shared/mui-theme";

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: "map"
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
			default:
				return <Login setPage={this.setPage} />;
		}
	};

	render() {
		let page = this.currentPage();

		return (
			<MuiThemeProvider theme={theme}>
				<div>
					<Header setPage={this.setPage} />
					{page}
				</div>
			</MuiThemeProvider>
		);
	}
}
