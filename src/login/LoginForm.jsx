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

import { Link as RouterLink } from "react-router-dom";

const SignupLink = React.forwardRef((props, ref) => (
	<RouterLink innerRef={ref} {...props} />
));

export const LoginForm = props => {
	const [userInfo, setUserInfo] = useState({
		name: "",
		password: ""
	});

	const context = useContext(AuthContext);

	const onSubmit = event => {
		event.preventDefault();
		context.login();
		props.setPage("map");
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
					Войти
				</Typography>
				<div>
					<p>
						Новый пользователь?{" "}
						<Link to="/signup" component={SignupLink}>
							Зарегистрируйтесь
						</Link>
					</p>
				</div>
				<form onSubmit={onSubmit}>
					<TextField
						label="Имя пользователя*"
						fullWidth
						margin="normal"
						name="name"
						type="text"
						value={userInfo.name}
						onChange={onInputChange}
					/>
					<TextField
						label="Пароль*"
						fullWidth
						margin="normal"
						name="password"
						type="password"
						value={userInfo.password}
						onChange={onInputChange}
					/>
					<Box className={classes.buttonContainer}>
						<Button type="submit" variant="contained" color="primary">
							Войти
						</Button>
					</Box>
				</form>
			</Container>
		</Paper>
	);
};

LoginForm.propTypes = {
	setPage: PropTypes.func
};
