import React from "react";

import { LoginForm } from "./LoginForm";
import { AuthPage } from "../shared/AuthPage";

export const Login = props => (
	<AuthPage>
		<LoginForm setPage={props.setPage} />
	</AuthPage>
);
