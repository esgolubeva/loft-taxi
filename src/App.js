import React from "react";

import { Header } from "./shared/Header";
import { Map } from "./map";
import { Login } from "./login";
import { Signup } from "./signup";
import { Profile } from "./profile";

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: "map"
		};

		this.setPage = this.setPage.bind(this);
		this.currentPage = this.currentPage.bind(this);
	}

	setPage(name) {
		this.setState({
			page: name
		});
	}

	currentPage() {
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
	}

	render() {
		let page = this.currentPage();

		return (
			<div>
				<Header setPage={this.setPage} />
				{page}
			</div>
		);
	}
}
