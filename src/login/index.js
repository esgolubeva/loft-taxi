import React from "react";

import { LoginForm } from "./LoginForm";

export const Login = props => (
	<div>
		<LoginForm setPage={props.setPage} />
	</div>
);
