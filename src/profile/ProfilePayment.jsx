import React, { useState } from "react";

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

export const ProfilePayment = React.memo(props => {
	const [selectedDate, handleDateChange] = useState(new Date());
	const [cardInfo, setCardInfo] = useState({
		number: "",
		expiryDate: new Date(),
		holderName: "",
		cvc: ""
	});

	const classes = useFormStyles();
	const onSubmit = event => {
		event.preventDefault();
		// fetchAuthRequest(userInfo);
	};

	const onInputChange = event => {
		let input = event.target;
		setCardInfo({ ...cardInfo, [input.name]: input.value });
		console.log(cardInfo);
	};
	const onDateInputChange = date => {
		setCardInfo({expiryDate : date });
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
				<form>
					<Box className={classes.cardsContainer}>
						<Paper className={classes.card}>
							<MCIcon />
							<TextField
								label="Номер карты:"
								fullWidth
								margin="normal"
								name="number"
								type="text"
								placeholder="0000 0000 0000 0000"
								value={cardInfo.number}
								onChange={onInputChange}
								InputLabelProps={{ shrink: true }}
							/>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<DatePicker
									views={["year", "month"]}
									minDate={new Date()}
									name="expiryDate"
									format="MM/yy"
									margin="normal"
									id="date-picker-inline"
									label="Срок действия:"
									// value={selectedDate}
									// onChange={( handleDateChange)}
									value={cardInfo.expiryDate}
									onChange={( onDateInputChange)}
									InputLabelProps={{ shrink: true }}
								/>
							</MuiPickersUtilsProvider>
						</Paper>

						<Paper className={classes.card}>
							<TextField
								label="Имя владельца:"
								fullWidth
								margin="normal"
								name="holderName"
								type="text"
								placeholder="USER NAME"
								value={cardInfo.holderName}
								onChange={onInputChange}
								InputLabelProps={{ shrink: true }}
							/>
							<TextField
								label="CVC:"
								margin="normal"
								name="cvc"
								type="number"
								placeholder="***"
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
