import React from "react";

export class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { name: "", password: "" };

		this.onSubmit = this.onSubmit.bind(this);
		this.onSignupClick = this.onSignupClick.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.setPage("map");
	}

	onSignupClick(e) {
		e.preventDefault();
		this.props.setPage("signup");
	}

	onInputChange(e) {
		let input = e.target;
		this.setState({ [input.name]: input.value });
	}

	render() {
		return (
			<div>
				<h1>Войти</h1>
				<div>
					Новый пользователь?{" "}
					<a href="/" onClick={this.onSignupClick}>
						Зарегистрируйтесь
					</a>
				</div>
				<form onSubmit={this.onSubmit}>
					<label>
						Имя пользователя<span>*</span>
						<input
							name="name"
							value={this.state.name}
							onChange={this.onInputChange}
						/>
					</label>
					<br />
					<label>
						Пароль<span>*</span>
						<input
							name="password"
							value={this.state.password}
							onChange={this.onInputChange}
						/>
					</label>
					<br />
					<input type="submit" value="Войти" />
				</form>
			</div>
		);
	}
}