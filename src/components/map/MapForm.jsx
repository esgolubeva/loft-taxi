import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import {
	fetchAddressRequest,
	getAddressList,
	getIsLoading,
} from "../../modules/address/";

const useFormStyles = makeStyles(() => ({
	form: {
		padding: "40px 0",
		width: "500px",
	},
	formContainer: {
		padding: "0 50px",
	},
	formControl: {
		minWidth: "100%",
	},
	buttonContainer: {
		marginTop: "30px",
	},
}));

const MapForm = React.memo(props => {
	const [route, setRoute] = useState({
		address1: "",
		address2: "",
	});

	useEffect(() => {
		const { fetchAddressRequest } = props;
		fetchAddressRequest();
	}, []);

	const { addressList } = props;

	const classes = useFormStyles();

	const AddressSelect = props => {
		const { addressNumber } = props;
		return (
			<Select
				labelId={addressNumber}
				value={route[addressNumber]}
				onChange={onChange}
				inputProps={{ name: addressNumber }}
				autoWidth
			>
				{addressList.length &&
					addressList.map(addressItem => (
						<MenuItem key={addressItem} value={addressItem}>
							{addressItem}
						</MenuItem>
					))}
			</Select>
		);
	};

	const onChange = event => {
		let input = event.target;
		console.log(input);
		setRoute({ ...route, [input.name]: input.value });
	};

	return (
		<Paper className={classes.form}>
			<Container className={classes.formContainer}>
				<form>
					<FormControl className={classes.formControl}>
						<InputLabel id="address1">Откуда </InputLabel>
						<AddressSelect addressNumber="address1" />
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel id="address2">Куда </InputLabel>
						<AddressSelect addressNumber="address2" />
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

const mapStateToProps = state => ({
	addressList: getAddressList(state),
	isLoading: getIsLoading(state),
});

const mapDispatchToProps = { fetchAddressRequest };

export default connect(mapStateToProps, mapDispatchToProps)(MapForm);
