import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link as RouterLink, Redirect } from "react-router-dom";
import useForm from "react-hook-form";
import { RHFInput } from "react-hook-form-input";

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
	const methods = useForm();
	const { handleSubmit, register, setValue, errors } = methods;
	const classes = useFormStyles();
	const { sendAuthRequest, isLoggedIn } = props;

	const onSubmit = data => {
		console.log(data);
		sendAuthRequest(data);
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
				<form onSubmit={handleSubmit(onSubmit)}>
					<RHFInput
						as={<TextField />}
						label="Имя пользователя"
						name="email"
						register={register({
							pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
						})}
						setValue={setValue}
						inputProps={{ "data-testid": "inputName" }}
						helperText={errors.email && "Incorrect entry."}
						margin="normal"
						fullWidth
						required
					/>
					<RHFInput
						as={<TextField />}
						label="Пароль"
						name="password"
						register={register}
						setValue={setValue}
						inputProps={{ "data-testid": "inputPassword" }}
						helperText={errors.password && "Incorrect entry."}
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
