import React from "react";

class AuthHandler {
	constructor() {
		this.isLoggedIn = false;
	}

	login = (username, password) => {
		this.isLoggedIn = true;
	};

	logout = () => {
		this.isLoggedIn = false;
	};
}

const defaultAuthHandler = new AuthHandler();

export const AuthContext = React.createContext();

export const AuthProvider = props => {
	return (
		<AuthContext.Provider value={defaultAuthHandler}>
			{props.children}
		</AuthContext.Provider>
	);
};
