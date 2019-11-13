import React from "react";

import SignupForm from "./SignupForm";
import { AuthPage } from "../shared/AuthPage";

export const Signup = props => (
	<AuthPage>
		<div data-testid="signup">
			<SignupForm setPage={props.setPage} />
		</div>
	</AuthPage>
);
