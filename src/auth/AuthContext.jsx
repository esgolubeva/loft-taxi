import React, { useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = props => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = (username, password) => {
		setIsLoggedIn(true);
		console.log(isLoggedIn);
	};

	const logout = () => {
		setIsLoggedIn(false);
		console.log(isLoggedIn);
	};
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				login,
				logout
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
