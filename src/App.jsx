import React, { useContext } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { Header } from "./shared/Header";

import { Router } from "./router/Router";
import { theme } from "loft-taxi-mui-theme";
import { AuthProvider } from "./auth";

import { BrowserRouter } from "react-router-dom";
// import { connect } from "react-redux";

// import { Provider } from "react-redux";
// import { createStore } from "redux";

// let store = createStore();

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: "login"
		};
	}

	// setPage = name => {
	// 	this.setState({
	// 		page: name
	// 	});
	// };

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

// const mapStateToProps = state => state;
// const mapDispatchToProps = "";

// export default connect(mapStateToProps, mapDispatchToProps)(App);
