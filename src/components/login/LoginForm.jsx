import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link as RouterLink, Redirect } from "react-router-dom";

import { useFormStyles } from "../shared/styles";
import {
	Container,
	Paper,
	Typography,
	Link,
	TextField,
	Box,
	Button
} from "@material-ui/core/";

import { getIsLoggedIn, getError, sendAuthRequest } from "../../modules/auth/";

const SignupLink = React.forwardRef((props, ref) => (
	<RouterLink innerRef={ref} {...props} />
));

const LoginForm = React.memo(props => {
	const [userInfo, setUserInfo] = useState({
		email: "",
		password: ""
	});

	const classes = useFormStyles();

	const { sendAuthRequest, isLoggedIn } = props;

	const onSubmit = event => {
		event.preventDefault();
		sendAuthRequest(userInfo);
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
	sendAuthRequest: PropTypes.func,
	isLoggedIn: PropTypes.bool
};

const mapStateToProps = state => ({
	isLoggedIn: getIsLoggedIn(state),
	error: getError(state)
});

const mapDispatchToProps = { sendAuthRequest };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
