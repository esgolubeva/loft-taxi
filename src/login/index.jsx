import React from "react";

import { LoginForm } from "./LoginForm";
import { AuthPage } from "../shared/AuthPage";

export const Login = props => (
	<AuthPage>
		<div data-testid="login">
			<LoginForm setPage={props.setPage} />
		</div>
	</AuthPage>
);
