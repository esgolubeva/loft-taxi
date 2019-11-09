import React from "react";
import { ProfilePage } from "./ProfilePage";
import ProfileForm from "./ProfileForm";

export const Profile = props => (
	<ProfilePage>
		<div data-testid="profile">
			<ProfileForm />
		</div>
	</ProfilePage>
);
