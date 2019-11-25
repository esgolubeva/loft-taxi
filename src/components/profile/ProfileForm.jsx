import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import useForm from "react-hook-form";
import { RHFInput } from "react-hook-form-input";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Paper, TextField, Button } from "@material-ui/core/";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MCIcon } from "loft-taxi-mui-theme";

import { NavLink } from "../shared/NavLink";
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
	},
	message: {
		marginTop: "30px",
		textAlign: "center"
	},
	button: {
		marginTop: "30px"
	}
}));

// eslint-disable-next-line react/display-name
const ProfileForm = React.memo(props => {
	const {
		sendCardRequest,
		savedCard,
		fetchCardRequest,
		setSuccessMessageIsShown,
		successMessageIsShown
	} = props;
	const classes = useFormStyles();

	const { handleSubmit, register, setValue } = useForm();

	useEffect(() => {
		fetchCardRequest();
	}, []);

	useEffect(() => {
		if (savedCard) {
			setValue("cardNumber", savedCard.cardNumber);
			setValue("expiryDate", savedCard.expiryDate);
			setValue("cardName", savedCard.cardName);
			setValue("cvc", savedCard.cvc);
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
		return (
			<Box className={classes.message}>
				<Typography variant="body1">Данные карты сохранены.</Typography>
				<Button
					className={classes.button}
					component={NavLink}
					to="/map"
					variant="contained"
					color="primary"
					size="large"
				>
					Заказать такси
				</Button>
			</Box>
		);
	}

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
						setValue={setValue}
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
						setValue={setValue}
						InputLabelProps={{ shrink: true }}
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
						setValue={setValue}
						inputProps={{
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
