import React from "react";
import PropTypes from "prop-types";

export class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { email: "", name: "", surname: "", password: "" };
	}

	static propTypes = {
		setPage: PropTypes.func
	}

	onSubmit = event => {
		event.preventDefault();
		this.props.setPage("map");
	};

	onLoginClick = event => {
		event.preventDefault();
		this.props.setPage("login");
	};

	onInputChange = event => {
		let input = event.target;
		this.setState({ [input.name]: input.value });
	};

	render() {
		return (
			<div>
				<h1>Регистрация</h1>
				<div>
					Уже зарегистрирован?{" "}
					<a href="/" onClick={this.onLoginClick}>
						Войти
					</a>
				</div>
				<form onSubmit={this.onSubmit}>
					<label>
						Адрес электронной почты
						<input
							name="email"
							value={this.state.email}
							onChange={this.onInputChange}
						/>
					</label>
					<br />
					<label>
						Имя
						<input
							name="name"
							value={this.state.name}
							onChange={this.onInputChange}
						/>
					</label>
					<label>
						Фамилия
						<input
							name="surname"
							value={this.state.surname}
							onChange={this.onInputChange}
						/>
					</label>
					<br />
					<label>
						Пароль
						<input
							name="password"
							value={this.state.password}
							onChange={this.onInputChange}
						/>
					</label>
					<br />
					<input type="submit" value="Зарегистрироваться" />
				</form>
			</div>
		);
	}
}
