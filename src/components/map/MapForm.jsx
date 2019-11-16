import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
	Container,
	Box,
	Paper,
	MenuItem,
	Select,
	Button,
	FormControl,
	InputLabel
} from "@material-ui/core/";

import {
	fetchAddressRequest,
	getAddressList,
	getIsLoading
} from "../../modules/address/";
import { fetchRouteRequest, getRoute } from "../../modules/route/";

const useFormStyles = makeStyles(() => ({
	form: {
		padding: "40px 0",
		width: "500px"
	},
	formContainer: {
		padding: "0 50px"
	},
	formControl: {
		minWidth: "100%"
	},
	buttonContainer: {
		marginTop: "30px"
	}
}));

const MapForm = React.memo(props => {
	const [route, setRoute] = useState({
		address1: "",
		address2: ""
	});

	useEffect(() => {
		const { fetchAddressRequest } = props;
		fetchAddressRequest();
	}, []);

	const { addressList, fetchRouteRequest } = props;

	const classes = useFormStyles();

	const AddressSelect = props => {
		const { firstAddress, secondAddress } = props;
		return (
			<Select
				value={route[firstAddress]}
				onChange={onChange}
				inputProps={{ name: firstAddress }}
				autoWidth
			>
				{addressList.length &&
					addressList.map(
						addressItem =>
							addressItem != route[secondAddress] && (
								<MenuItem key={addressItem} value={addressItem}>
									{addressItem}
								</MenuItem>
							)
					)}
			</Select>
		);
	};

	const onChange = event => {
		let input = event.target;
		setRoute({ ...route, [input.name]: input.value });
	};

	const onSubmit = event => {
		event.preventDefault();
		fetchRouteRequest(route);
		console.log(JSON.stringify(route));
	};

	return (
		<Paper className={classes.form}>
			<Container className={classes.formContainer}>
				<form onSubmit={onSubmit}>
					<FormControl className={classes.formControl}>
						<InputLabel id="address1">Откуда </InputLabel>
						<AddressSelect firstAddress="address1" secondAddress="address2" />
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel id="address2">Куда </InputLabel>
						<AddressSelect firstAddress="address2" secondAddress="address1" />
					</FormControl>
					<Box className={classes.buttonContainer}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							data-testid="buttonLogin"
							fullWidth
							size="large"
						>
							Вызвать такси
						</Button>
					</Box>
				</form>
			</Container>
		</Paper>
	);
});

MapForm.propTypes = {
	fetchAddressRequest: PropTypes.func,
	fetchRouteRequest: PropTypes.func,
	addressList: PropTypes.array,
	firstAddress: PropTypes.string,
	secondAddress: PropTypes.string
};

const mapStateToProps = state => ({
	addressList: getAddressList(state),
	isLoading: getIsLoading(state)
});

const mapDispatchToProps = { fetchAddressRequest, fetchRouteRequest };

export default connect(mapStateToProps, mapDispatchToProps)(MapForm);
