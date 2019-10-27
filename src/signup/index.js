import React from "react";

import { SignupForm } from "./SignupForm";

export class Signup extends React.Component {
	render() {
		return (
			<div>
				<SignupForm setPage={this.props.setPage} />
			</div>
		);
	}
}
