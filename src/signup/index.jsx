import React from "react";

import { SignupForm } from "./SignupForm";
import { AuthPage } from "../shared/AuthPage";

export const Signup = props => (
	<AuthPage>
		<SignupForm setPage={props.setPage} />
	</AuthPage>
);
