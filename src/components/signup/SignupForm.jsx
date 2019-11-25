import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import useForm from "react-hook-form";
import { RHFInput } from "react-hook-form-input";

import { useFormStyles } from "../shared/styles";
import {
	Paper,
	Container,
	Typography,
	Link,
	Grid,
	TextField,
	Box,
	Button
} from "@material-ui/core/";

import { Link as RouterLink, Redirect } from "react-router-dom";

import {
	getIsLoggedIn,
	getError,
	sendRegisterRequest
} from "../../modules/auth";

const LoginLink = React.forwardRef((props, ref) => (
	<RouterLink innerRef={ref} {...props} />
));

LoginLink.displayName = "LoginLink";

const SignupForm = React.memo(props => {
	const { handleSubmit, register, setValue } = useForm();

	const { sendRegisterRequest, isLoggedIn } = props;

	const onSubmit = data => {
		console.log(data);
		sendRegisterRequest(data);
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
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<RHFInput
								as={<TextField />}
								label="Адрес электронной почты"
								name="email"
								register={register}
								setValue={setValue}
								inputProps={{ "data-testid": "inputEmail", type: "email" }}
								margin="normal"
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={6}>
							<RHFInput
								as={<TextField />}
								label="Имя"
								name="name"
								register={register}
								setValue={setValue}
								inputProps={{ "data-testid": "inputName" }}
								margin="normal"
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={6}>
							<RHFInput
								as={<TextField />}
								label="Фамилия"
								name="surname"
								register={register}
								setValue={setValue}
								inputProps={{ "data-testid": "inputSurname" }}
								margin="normal"
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<RHFInput
								as={<TextField />}
								label="Пароль"
								name="password"
								register={register}
								setValue={setValue}
								inputProps={{
									"data-testid": "inputPassword",
									type: "password"
								}}
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
});

SignupForm.displayName = "SignupForm";

SignupForm.propTypes = {
	sendRegisterRequest: PropTypes.func,
	isLoggedIn: PropTypes.bool
};

const mapStateToProps = state => ({
	isLoggedIn: getIsLoggedIn(state),
	error: getError(state)
});

const mapDispatchToProps = { sendRegisterRequest };

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
