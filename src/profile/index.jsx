import React from "react";
import { ProfilePage } from "./ProfilePage";
import ProfilePayment from "./ProfilePayment";

export const Profile = props => (
	<ProfilePage>
		<div data-testid="profile">
			<ProfilePayment />
		</div>
	</ProfilePage>
);
