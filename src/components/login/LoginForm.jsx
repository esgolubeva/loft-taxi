import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link as RouterLink, Redirect } from "react-router-dom";

import { useFormStyles } from "../shared/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { getIsLoggedIn, getError, fetchAuthRequest } from "../../modules/auth/";

const SignupLink = React.forwardRef((props, ref) => (
	<RouterLink innerRef={ref} {...props} />
));

const LoginForm = React.memo(props => {
	const [userInfo, setUserInfo] = useState({
		email: "",
		password: ""
	});

	const classes = useFormStyles();

	const { fetchAuthRequest, isLoggedIn } = props;

	const onSubmit = event => {
		event.preventDefault();
		fetchAuthRequest(userInfo);
	};

	const onInputChange = event => {
		let input = event.target;
		setUserInfo({ ...userInfo, [input.name]: input.value });
	};

	if (isLoggedIn) {
		return <Redirect to="/map" />;
	}

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
						label="Имя пользователя"
						type="email"
						name="email"
						value={userInfo.email}
						onChange={onInputChange}
						inputProps={{ "data-testid": "inputName" }}
						margin="normal"
						fullWidth
						required
					/>
					<TextField
						label="Пароль"
						type="password"
						name="password"
						value={userInfo.password}
						onChange={onInputChange}
						inputProps={{ "data-testid": "inputPassword" }}
						margin="normal"
						fullWidth
						required
					/>
					<Box className={classes.buttonContainer}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							data-testid="buttonLogin"
						>
							Войти
						</Button>
					</Box>
				</form>
			</Container>
		</Paper>
	);
});

LoginForm.propTypes = {
	setPage: PropTypes.func
};

const mapStateToProps = state => ({
	isLoggedIn: getIsLoggedIn(state),
	error: getError(state)
});

const mapDispatchToProps = { fetchAuthRequest };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm);
