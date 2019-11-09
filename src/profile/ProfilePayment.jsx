import React, { useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MCIcon } from "loft-taxi-mui-theme";

import { getCardInfo, getError, fetchCardRequest } from "../modules/card/";

export const useFormStyles = makeStyles(theme => ({
	form: {
		padding: "56px 0 72px",
		width: "945px"
	},
	formContainer: {
		padding: "0 73px"
	},
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

const ProfilePayment = React.memo(props => {
	const { fetchCardRequest, savedCard } = props;

	const [cardInfo, setCardInfo] = useState({
		cardNumber: savedCard.cardNumber || "",
		expiryDate: savedCard.expiryDate || new Date(),
		cardName: savedCard.cardName || "",
		cvc: savedCard.cvc || "",
		token: window.localStorage.getItem("token")
	});

	const classes = useFormStyles();


	const onSubmit = event => {
		event.preventDefault();
		fetchCardRequest(cardInfo);
	};

	const onInputChange = event => {
		let input = event.target;
		setCardInfo({ ...cardInfo, [input.name]: input.value });
		console.log(cardInfo);
	};
	const onDateInputChange = date => {
		setCardInfo({ ...cardInfo, expiryDate: date });
		console.log(cardInfo);
	};

	return (
		<Paper className={classes.form}>
			<Container className={classes.formContainer}>
				<Box textAlign="center">
					<Typography variant="h4" component="h1">
						Профиль
					</Typography>
					<Typography variant="subtitle1">Способ оплаты</Typography>
				</Box>
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
						<Button
							type="submit"
							variant="contained"
							color="primary"
							size="large"
						>
							Сохранить
						</Button>
					</Box>
				</form>
			</Container>
		</Paper>
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
)(ProfilePayment);
