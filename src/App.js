import React from "react";
// import logo from './logo.svg';
// import "./App.css";

import { Header } from "./Header";
import { Map } from "./Map";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Profile } from "./Profile";

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: "map"
		};
	}

	setPage(name) {
		this.setState({
			page: name
		});
	}

	render() {
		let page;

		switch (this.state.page) {
			case "map":
				page = <Map />;
				break;
			case "login":
				page = <Login />;
				break;
			case "signup":
				page = <Signup />;
				break;
			case "profile":
				page = <Profile />;
				break;
			default:
				page = <Map />;
		}

		return (
			<div>
				<Header handler={this.setPage.bind(this)} />
				{page}
			</div>
		);
	}
}
