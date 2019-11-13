import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { useFormStyles } from "../shared/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { Link as RouterLink, Redirect } from "react-router-dom";

import {
	getIsLoggedIn,
	getError,
	fetchRegisterRequest
} from "../../modules/auth";

const LoginLink = React.forwardRef((props, ref) => (
	<RouterLink innerRef={ref} {...props} />
));

const SignupForm = props => {
	const [userInfo, setUserInfo] = useState({
		email: "",
		password: "",
		name: "",
		surname: ""
	});

	const { fetchRegisterRequest, isLoggedIn } = props;

	const onSubmit = event => {
		event.preventDefault();
		fetchRegisterRequest(userInfo);
	};

	const onInputChange = event => {
		let input = event.target;
		setUserInfo({ ...userInfo, [input.name]: input.value });
	};

	const classes = useFormStyles();

	if (isLoggedIn) {
		return <Redirect to="/map" />;
	}

	return (
		<Paper className={classes.form}>
			<Container className={classes.formContainer}>
				<Typography variant="h4" component="h1">
					Регистрация
				</Typography>
				<div>
					<p>
						Уже зарегистрирован?{" "}
						<Link to="/login" component={LoginLink}>
							Войти
						</Link>
					</p>
				</div>
				<form onSubmit={onSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								label="Адрес электронной почты"
								type="email"
								name="email"
								value={userInfo.email}
								onChange={onInputChange}
								inputProps={{ "data-testid": "inputEmail" }}
								margin="normal"
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								label="Имя"
								type="text"
								name="name"
								value={userInfo.name}
								onChange={onInputChange}
								inputProps={{ "data-testid": "inputName" }}
								margin="normal"
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								label="Фамилия"
								type="text"
								name="surname"
								value={userInfo.surname}
								onChange={onInputChange}
								inputProps={{ "data-testid": "inputSurname" }}
								margin="normal"
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={12}>
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

const mapStateToProps = state => ({
	isLoggedIn: getIsLoggedIn(state),
	error: getError(state)
});

const mapDispatchToProps = { fetchRegisterRequest };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignupForm);
