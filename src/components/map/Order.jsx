import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Paper, Box, Typography, Button } from "@material-ui/core/";

import OrderForm from "./OrderForm";
import { NavLink } from "../shared/NavLink";
import { fetchCardRequest, getPaymentMethodSaved } from "../../modules/card";
import { getOrderIsAccepted, resetRoute } from "../../modules/route";

const useFormStyles = makeStyles(() => ({
	container: {
		padding: "24px"
	},
	order: {
		padding: "40px 0",
		width: "500px"
	},
	orderContainer: {
		padding: "0 50px"
	},
	message: {
		textAlign: "center"
	},
	button: {
		marginTop: "30px"
	}
}));

const Order = React.memo(props => {
	const {
		paymentMethodSaved,
		fetchCardRequest,
		orderIsAccepted,
		resetRoute
	} = props;
	const classes = useFormStyles();

	useEffect(() => {
		if (!paymentMethodSaved) {
			fetchCardRequest();
		}
	}, []);

	const onNewOrderClick = () => {
		resetRoute();
	};

	function Content() {
		if (!paymentMethodSaved) {
			return (
				<Box className={classes.message}>
					<Typography variant="body1">
						Заполните данные банковской карты
					</Typography>
					<Button
						className={classes.button}
						component={NavLink}
						to="/profile"
						variant="contained"
						color="primary"
						size="large"
					>
						Перейти в Профиль
					</Button>
				</Box>
			);
		} else if (orderIsAccepted) {
			return (
				<Box className={classes.message}>
					<Typography variant="body1">
						Ваш заказ принят. Такси скоро приедет.
					</Typography>
					<Button
						onClick={onNewOrderClick}
						className={classes.button}
						variant="contained"
						color="primary"
						size="large"
					>
						Сделать новый заказ
					</Button>
				</Box>
			);
		}
		return <OrderForm />;
	}

	return (
		<Container className={classes.container}>
			<Paper className={classes.order}>
				<Container className={classes.orderContainer}>
					<Content />
				</Container>
			</Paper>
		</Container>
	);
});

Order.displayName = "Order";
Order.propTypes = {
	fetchCardRequest: PropTypes.func,
	resetRoute: PropTypes.func,
	paymentMethodSaved: PropTypes.bool,
	orderIsAccepted: PropTypes.bool
};

const mapStateToProps = state => ({
	paymentMethodSaved: getPaymentMethodSaved(state),
	orderIsAccepted: getOrderIsAccepted(state)
});

const mapDispatchToProps = {
	fetchCardRequest,
	resetRoute
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
