import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
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

import {
	getIsLoggedIn,
	getError,
	sendRegisterRequest
} from "../../modules/auth";
import { NavLink } from "../shared/NavLink";

const SignupForm = React.memo(props => {
	const { sendRegisterRequest, isLoggedIn } = props;
	const classes = useFormStyles();
	const { handleSubmit, register, setValue } = useForm();

	const onSubmit = data => {
		sendRegisterRequest(data);
	};

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
						<Link to="/login" component={NavLink}>
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
								inputProps={{ "data-testid": "inputName", type: "text" }}
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
								inputProps={{ "data-testid": "inputSurname", type: "text" }}
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
									type: "password",
									minLength: 8
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
