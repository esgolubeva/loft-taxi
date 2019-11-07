import React, { useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = props => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = (username, password) => {
		setIsLoggedIn(true);
	};

	const logout = () => {
		setIsLoggedIn(false);
	};
	
	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{props.children}
		</AuthContext.Provider>
	);
};
