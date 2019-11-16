import React from "react";

import SignupForm from "./SignupForm";
import { AuthPage } from "../shared/AuthPage";

export const Signup = () => (
	<AuthPage>
		<div data-testid="signup">
			<SignupForm />
		</div>
	</AuthPage>
);
