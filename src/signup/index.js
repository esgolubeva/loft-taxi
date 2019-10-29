import React from "react";

import { SignupForm } from "./SignupForm";

export const Signup = (props) => (
	<div>
		<SignupForm setPage={props.setPage} />
	</div>
);
