import React, { PureComponent } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { Header } from "./shared/Header";

import { Router } from "./router/Router";
import { theme } from "loft-taxi-mui-theme";
import { AuthProvider } from "./auth";

import { BrowserRouter } from "react-router-dom";

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
