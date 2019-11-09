import React, { useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MCIcon } from "loft-taxi-mui-theme";

import { getCardInfo, getError, fetchCardRequest } from "../modules/card";

export const useFormStyles = makeStyles(theme => ({

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
	const classes = useFormStyles();

	const { fetchCardRequest, savedCard } = props;

	const [cardInfo, setCardInfo] = useState({
		cardNumber: savedCard.cardNumber || "",
		expiryDate: savedCard.expiryDate || new Date(),
		cardName: savedCard.cardName || "",
		cvc: savedCard.cvc || "",
		token: window.localStorage.getItem("token")
	});

	const onSubmit = event => {
		event.preventDefault();
		fetchCardRequest(cardInfo);
	};

	const onInputChange = event => {
		let input = event.target;
		setCardInfo({ ...cardInfo, [input.name]: input.value });
	};
	
	const onDateInputChange = date => {
		setCardInfo({ ...cardInfo, expiryDate: date });
	};

	return (
		<form onSubmit={onSubmit}>
			<Box className={classes.cardsContainer}>
				<Paper className={classes.card}>
					<MCIcon />
					<TextField
						label="Номер карты:"
						fullWidth
						margin="normal"
						name="cardNumber"
						type="text"
						placeholder="0000 0000 0000 0000"
						value={cardInfo.cardNumber}
						onChange={onInputChange}
						InputLabelProps={{ shrink: true }}
					/>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<DatePicker
							name="expiryDate"
							format="MM/yy"
							minDate={new Date()}
							variant="inline"
							openTo="year"
							margin="normal"
							views={["year", "month"]}
							label="Срок действия:"
							value={cardInfo.expiryDate}
							onChange={onDateInputChange}
							InputLabelProps={{ shrink: true }}
						/>
					</MuiPickersUtilsProvider>
				</Paper>
				<Paper className={classes.card}>
					<TextField
						label="Имя владельца:"
						fullWidth
						margin="normal"
						name="cardName"
						type="text"
						placeholder="USER NAME"
						value={cardInfo.cardName}
						onChange={onInputChange}
						InputLabelProps={{ shrink: true }}
					/>
					<TextField
						label="CVC:"
						margin="normal"
						name="cvc"
						type="text"
						placeholder="***"
						inputProps={{
							maxLength: 3
						}}
						value={cardInfo.cvc}
						onChange={onInputChange}
						InputLabelProps={{ shrink: true }}
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

const mapStateToProps = state => ({
	savedCard: getCardInfo(state),
	error: getError(state)
});

const mapDispatchToProps = { fetchCardRequest };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileForm);
