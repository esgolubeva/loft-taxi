import React from "react";
import { BrowserRouter } from "react-router-dom";

import { theme } from "loft-taxi-mui-theme";
import { MuiThemeProvider } from "@material-ui/core/styles";

import Router from "./router/Router";
import Header from "./shared/Header";

import { AuthProvider } from "./auth";

export class App extends React.Component {
	render() {
		return (
			<AuthProvider>
				<MuiThemeProvider theme={theme}>
					<BrowserRouter>
						<Header />
						<Router />
					</BrowserRouter>
				</MuiThemeProvider>
			</AuthProvider>
		);
	}
}
