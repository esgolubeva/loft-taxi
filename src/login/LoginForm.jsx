import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import { AuthContext } from "../auth";

export const LoginForm = props => {
	const [userInfo, setUserInfo] = useState({ name: "", password: "" });

	const context = useContext(AuthContext);

	const onSubmit = event => {
		event.preventDefault();
		context.login();
		props.setPage("map");
	};

	const onSignupClick = event => {
		event.preventDefault();
		props.setPage("signup");
	};

	const onInputChange = event => {
		let input = event.target;
		setUserInfo({ ...userInfo, [input.name]: input.value });
	};

	return (
		<div>
			<h1>Войти</h1>
			<div>
				Новый пользователь?{" "}
				<a href="/" onClick={onSignupClick}>
					Зарегистрируйтесь
				</a>
			</div>
			<form onSubmit={onSubmit}>
				<label>
					Имя пользователя<span>*</span>
					<input name="name" value={userInfo.name} onChange={onInputChange} />
				</label>
				<br />
				<label>
					Пароль<span>*</span>
					<input
						name="password"
						value={userInfo.password}
						onChange={onInputChange}
					/>
				</label>
				<br />
				<input type="submit" value="Войти" />
			</form>
		</div>
	);
};

LoginForm.propTypes = {
	setPage: PropTypes.func
};
