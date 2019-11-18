import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Paper, TextField, Button } from "@material-ui/core/";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MCIcon } from "loft-taxi-mui-theme";

import {
	getSavedCard,
	getError,
	sendCardRequest,
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
		position: "absolute",
		bottom: "30px",
		left: 0,
		width: "100%",
		textAlign: "center"
	}
}));

const ProfileForm = React.memo(props => {
	const classes = useFormStyles();

	const { sendCardRequest, fetchCardRequest, savedCard } = props;

	// useEffect(() => {
	// 	fetchCardRequest();
	// }, []);

	// useEffect(() => {setCardInfo(savedCard)}, [savedCard]);

	const [cardInfo, setCardInfo] = useState({
		cardNumber: savedCard.cardNumber || "",
		expiryDate: savedCard.expiryDate || new Date(),
		cardName: savedCard.cardName || "",
		cvc: savedCard.cvc || ""
	});

	const onSubmit = event => {
		event.preventDefault();
		sendCardRequest(cardInfo);
	};

	const onInputChange = event => {
		let input = event.target;
		setCardInfo({ ...cardInfo, [input.name]: input.value });
	};

	const onDateInputChange = date => {
		setCardInfo({ ...cardInfo, expiryDate: date });
	};

	// const Message = () => {
	// 	if (showMessage) {
	// 		return (
	// 			<Box className={classes.message}>
	// 				<Typography variant="body1">Данные карты сохранены.</Typography>
	// 			</Box>
	// 		);
	// 	}
	// 	return null;
	// };

	return (
		<form onSubmit={onSubmit}>
			<Box className={classes.cardsContainer}>
				<Paper className={classes.card}>
					<MCIcon />
					<TextField
						label="Номер карты:"
						placeholder="0000 0000 0000 0000"
						type="text"
						name="cardNumber"
						value={cardInfo.cardNumber}
						onChange={onInputChange}
						InputLabelProps={{ shrink: true }}
						margin="normal"
						fullWidth
						required
					/>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<DatePicker
							label="Срок действия:"
							placeholder="12/34"
							name="expiryDate"
							value={cardInfo.expiryDate}
							onChange={onDateInputChange}
							openTo="year"
							minDate={new Date()}
							views={["year", "month"]}
							format="MM/yy"
							InputLabelProps={{ shrink: true }}
							variant="inline"
							margin="normal"
							required
						/>
					</MuiPickersUtilsProvider>
				</Paper>
				<Paper className={classes.card}>
					<TextField
						label="Имя владельца:"
						placeholder="USER NAME"
						type="text"
						name="cardName"
						value={cardInfo.cardName}
						onChange={onInputChange}
						InputLabelProps={{ shrink: true }}
						margin="normal"
						fullWidth
						required
					/>
					<TextField
						label="CVC:"
						type="text"
						placeholder="123"
						name="cvc"
						value={cardInfo.cvc}
						onChange={onInputChange}
						inputProps={{
							maxLength: 3
						}}
						InputLabelProps={{ shrink: true }}
						margin="normal"
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
	fetchCardRequest: PropTypes.func,
	savedCard: PropTypes.object
};

const mapStateToProps = state => ({
	savedCard: getSavedCard(state),
	error: getError(state)
});

const mapDispatchToProps = { sendCardRequest, fetchCardRequest };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
