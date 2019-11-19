import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link as RouterLink, withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Paper, TextField, Button } from "@material-ui/core/";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MCIcon } from "loft-taxi-mui-theme";

import {
	getSavedCard,
	getError,
	sendCardRequest,
	fetchCardRequest,
	setSuccessMessageIsShown,
	getSuccessMessageIsShown
} from "../../modules/card";

const NavLink = React.forwardRef((props, ref) => (
	<RouterLink innerRef={ref} {...props} />
));

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

const ProfileForm = withRouter(
	React.memo(props => {
		const classes = useFormStyles();

		const {
			sendCardRequest,
			savedCard,
			setSuccessMessageIsShown,
			successMessageIsShown
		} = props;

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

		useEffect(() => {
			return () => {
				setSuccessMessageIsShown(false);
			};
		}, []);

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
			<form onSubmit={onSubmit}>
				<Box textAlign="center">
					<Typography variant="subtitle1">Способ оплаты</Typography>
				</Box>
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
		);
	})
);

ProfileForm.propTypes = {
	sendCardRequest: PropTypes.func,
	fetchCardRequest: PropTypes.func,
	savedCard: PropTypes.object,
	successMessageIsShown: PropTypes.bool,
	setSuccessMessageIsShown: PropTypes.func
};

const mapStateToProps = state => ({
	savedCard: getSavedCard(state),
	error: getError(state),
	successMessageIsShown: getSuccessMessageIsShown(state)
});

const mapDispatchToProps = {
	sendCardRequest,
	fetchCardRequest,
	setSuccessMessageIsShown
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
