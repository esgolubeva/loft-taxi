import React from "react";

import { LoginForm } from "./LoginForm";

export class Login extends React.Component {
	render() {
		return (
			<div>
                <LoginForm setPage={this.props.setPage}/>
			</div>
		);
	}
}
