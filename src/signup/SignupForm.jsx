import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import { AuthContext } from "../auth";
import { useFormStyles } from "../shared/styles";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
	const classes = useFormStyles();

	return (
		<Paper className={classes.form}>
			<Container className={classes.formContainer}>
				<Typography variant="h4" component="h1">
					Регистрация
				</Typography>
				<div>
					<p>
						Уже зарегистрирован?{" "}
						<Link href="/" onClick={onLoginClick}>
							Войти
						</Link>
					</p>
				</div>
				<form onSubmit={onSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								label="Адрес электронной почты"
								fullWidth
								margin="normal"
								name="email"
								type="email"
								value={userInfo.email}
								onChange={onInputChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								label="Имя"
								fullWidth
								margin="normal"
								name="name"
								type="text"
								value={userInfo.name}
								onChange={onInputChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								label="Фамилия"
								fullWidth
								margin="normal"
								name="surname"
								type="text"
								value={userInfo.surname}
								onChange={onInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Пароль"
								fullWidth
								margin="normal"
								name="password"
								type="password"
								value={userInfo.password}
								onChange={onInputChange}
							/>
						</Grid>
					</Grid>
					<Box className={classes.buttonContainer}>
						<Button type="submit" variant="contained" color="primary">
							Зарегистрироваться
						</Button>
					</Box>
				</form>
			</Container>
		</Paper>
	);
};

SignupForm.propTypes = {
	setPage: PropTypes.func
};
