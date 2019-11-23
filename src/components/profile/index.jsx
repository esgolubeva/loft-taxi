import React from "react";

import { ProfilePage } from "./ProfilePage";
import ProfileForm from "./ProfileForm";

export const Profile = () => (
	<ProfilePage>
		<div data-testid="profile">
			<ProfileForm />
		</div>
	</ProfilePage>
);
