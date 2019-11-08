import React from "react";

import LoginForm from "./LoginForm";
import { AuthPage } from "../shared/AuthPage";

export const Login = () => (
	<AuthPage>
		<div data-testid="login">
			<LoginForm />
		</div>
	</AuthPage>
);
