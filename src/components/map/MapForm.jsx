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

import { fetchAddressRequest, getAddressList } from "../../modules/address/";
import { fetchRouteRequest } from "../../modules/route/";

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
		from: "",
		to: ""
	});

	useEffect(() => {
		const { fetchAddressRequest } = props;
		fetchAddressRequest();
	}, []);

	const { addressList, fetchRouteRequest } = props;

	const classes = useFormStyles();

	const AddressSelect = props => {
		const { addressKey, otherAddress } = props;

		let availableAddresses = addressList
			.filter(item => item != otherAddress)
			.map(addressItem => (
				<MenuItem key={addressItem} value={addressItem}>
					{addressItem}
				</MenuItem>
			));

		return (
			<Select
				value={route[addressKey]}
				onChange={onChange}
				inputProps={{ name: addressKey }}
				autoWidth
			>
				{availableAddresses}
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
	};

	return (
		<Paper className={classes.form}>
			<Container className={classes.formContainer}>
				<form onSubmit={onSubmit}>
					<FormControl className={classes.formControl}>
						<InputLabel id="from">Откуда</InputLabel>
						<AddressSelect addressKey="from" otherAddress={route.to} />
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel id="to">Куда</InputLabel>
						<AddressSelect addressKey="to" otherAddress={route.from} />
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
	addressKey: PropTypes.string,
	otherAddress: PropTypes.string
};

const mapStateToProps = state => ({
	addressList: getAddressList(state)
});

const mapDispatchToProps = { fetchAddressRequest, fetchRouteRequest };

export default connect(mapStateToProps, mapDispatchToProps)(MapForm);
