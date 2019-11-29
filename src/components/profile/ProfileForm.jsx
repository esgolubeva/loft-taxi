import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import useForm from "react-hook-form";
import { RHFInput } from "react-hook-form-input";
import formatStringByPattern from "format-string-by-pattern";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Paper, TextField, Button } from "@material-ui/core/";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MCIcon } from "loft-taxi-mui-theme";

import { SuccessMessage } from "./SuccessMessage";
import {
	getSavedCard,
	getError,
	sendCardRequest,
	setSuccessMessageIsShown,
	getSuccessMessageIsShown,
	fetchCardRequest
} from "../../modules/card";

export const useFormStyles = makeStyles(() => ({
	buttonContainer: {
		display: "flex",
		justifyContent: "center",
		marginTop: "46px"
	},
	cardsContainer: {
		marginTop: "40px",
		display: "flex",
		justifyContent: "space-between"
	},
	card: {
		boxSizing: "border-box",
		height: "230px",
		width: "384px",
		padding: "40px 30px 30px",
		position: "relative"
	}
}));

const ProfileForm = React.memo(props => {
	const {
		sendCardRequest,
		savedCard,
		fetchCardRequest,
		setSuccessMessageIsShown,
		successMessageIsShown
	} = props;
	const classes = useFormStyles();

	const { handleSubmit, register, setValue, errors } = useForm();

	useEffect(() => {
		fetchCardRequest();
	}, []);

	useEffect(() => {
		if (savedCard) {
			setValue("cardNumber", savedCard.cardNumber);
			setValue("expiryDate", savedCard.expiryDate);
			setValue("cardName", savedCard.cardName);
			setValue("cvc", savedCard.cvc);
		} else {
			setValue("expiryDate", new Date());
		}
	}, [savedCard]);

	useEffect(() => {
		return () => {
			setSuccessMessageIsShown(false);
		};
	}, []);

	const onSubmit = data => {
		sendCardRequest(data);
	};

	if (successMessageIsShown) {
		return <SuccessMessage />;
	}

	const formatInputValue = (data, value) => {
		const onlyNumbers = value.replace(/[^\d]/g, "");
		const LettersNumbersSpaces = value.replace(/[^A-Za-z0-9 ]/g, "");
		let formattedValue;
		switch (data) {
			case "cardNumber":
				formattedValue = formatStringByPattern(
					"9999 9999 9999 9999",
					onlyNumbers
				);
				break;
			case "cvc":
				formattedValue = formatStringByPattern("999", onlyNumbers);
				break;
			case "cardName":
				formattedValue = LettersNumbersSpaces.toUpperCase();
				break;
			default:
				formattedValue = value;
		}
		return formattedValue;
	};

	const onInputChange = (data, value) => {
		setValue(data, formatInputValue(data, value));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box textAlign="center">
				<Typography variant="subtitle1">Способ оплаты</Typography>
			</Box>
			<Box className={classes.cardsContainer}>
				<Paper className={classes.card}>
					<MCIcon />
					<RHFInput
						as={<TextField />}
						label="Номер карты:"
						placeholder="0000 0000 0000 0000"
						name="cardNumber"
						register={register}
						setValue={onInputChange}
						helperText={
							errors.cardNumber && "Номер карты должен сожержать 16 символов"
						}
						rules={{
							minLength: 19,
							maxLength: 19
						}}
						InputProps={{ type: "string" }}
						InputLabelProps={{ shrink: true }}
						margin="normal"
						fullWidth
						required
					/>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<RHFInput
							as={<DatePicker />}
							label="Срок действия:"
							placeholder="12/34"
							name="expiryDate"
							register={register}
							setValue={setValue}
							InputLabelProps={{ shrink: true }}
							views={["year", "month"]}
							format="MM/yy"
							disablePast
							disableToolbar
							margin="normal"
							fullWidth
							required
						/>
					</MuiPickersUtilsProvider>
				</Paper>
				<Paper className={classes.card}>
					<RHFInput
						as={<TextField />}
						label="Имя владельца:"
						placeholder="USER NAME"
						name="cardName"
						register={register}
						setValue={onInputChange}
						InputLabelProps={{ shrink: true }}
						inputProps={{
							type: "text",
							pattern: "[a-zA-z+0-9][a-zA-Z0-9 ]+",
							title:
								"Имя может содержать только латинские символы, цифры и символ пробела"
						}}
						margin="normal"
						fullWidth
						required
					/>
					<RHFInput
						as={<TextField />}
						label="CVC"
						placeholder="123"
						name="cvc"
						register={register}
						setValue={onInputChange}
						inputProps={{
							type: "string"
						}}
						helperText={errors.cvc && "cvc должен сожержать 3 символа"}
						rules={{
							minLength: 3,
							maxLength: 3
						}}
						InputLabelProps={{ shrink: true }}
						margin="normal"
						fullWidth
						required
					/>
				</Paper>
			</Box>
			<Box className={classes.buttonContainer}>
				<Button type="submit" variant="contained" color="primary" size="large">
					Сохранить
				</Button>
			</Box>
		</form>
	);
});

ProfileForm.displayName = "ProfileForm";
ProfileForm.propTypes = {
	sendCardRequest: PropTypes.func,
	savedCard: PropTypes.object,
	successMessageIsShown: PropTypes.bool,
	setSuccessMessageIsShown: PropTypes.func,
	fetchCardRequest: PropTypes.func
};

const mapStateToProps = state => ({
	savedCard: getSavedCard(state),
	error: getError(state),
	successMessageIsShown: getSuccessMessageIsShown(state)
});

const mapDispatchToProps = {
	sendCardRequest,
	setSuccessMessageIsShown,
	fetchCardRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
