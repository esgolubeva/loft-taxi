import { makeStyles } from "@material-ui/core/styles";

export const useFormStyles = makeStyles(() => ({
	form: {
		padding: "60px 0",
		width: "500px"
	},
	formContainer: {
		padding: "0 60px 0 50px"
	},
	buttonContainer: {
		display: "flex",
		justifyContent: "flex-end",
		marginTop: "30px"
	}
}));
