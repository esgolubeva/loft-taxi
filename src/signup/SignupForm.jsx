import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import { AuthContext } from "../auth";

export const SignupForm = props => {
	const [userInfo, setUserInfo] = useState({
		email: "",
		name: "",
		surname: "",
		password: ""
	});

	const context = useContext(AuthContext);

	const onSubmit = event => {
		event.preventDefault();
		context.login();
		props.setPage("map");
	};

	const onLoginClick = event => {
		event.preventDefault();
		props.setPage("login");
	};

	const onInputChange = event => {
		let input = event.target;
		setUserInfo({ ...userInfo, [input.name]: input.value });
	};

	return (
		<div>
			<h1>Регистрация</h1>
			<div>
				Уже зарегистрирован?{" "}
				<a href="/" onClick={onLoginClick}>
					Войти
				</a>
			</div>
			<form onSubmit={onSubmit}>
				<label>
					Адрес электронной почты
					<input name="email" value={userInfo.email} onChange={onInputChange} />
				</label>
				<br />
				<label>
					Имя
					<input name="name" value={userInfo.name} onChange={onInputChange} />
				</label>
				<label>
					Фамилия
					<input
						name="surname"
						value={userInfo.surname}
						onChange={onInputChange}
					/>
				</label>
				<br />
				<label>
					Пароль
					<input
						name="password"
						value={userInfo.password}
						onChange={onInputChange}
					/>
				</label>
				<br />
				<input type="submit" value="Зарегистрироваться" />
			</form>
		</div>
	);
};

SignupForm.propTypes = {
	setPage: PropTypes.func
};
