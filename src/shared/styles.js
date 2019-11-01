import { makeStyles } from "@material-ui/core/styles";
import Background from "../img/bg/auth-bg.jpg";

export const useAuthPageStyles = makeStyles(theme => ({
	authBg: {
		backgroundColor: "#000",
		backgroundImage: `url(${Background})`,
		backgroundSize: "cover"
	},
	container: {
		maxWidth: "1000px",
		minHeight: "calc(100vh - 72px)", // TODO add header height
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	logoContainer: {
		width: "420px",
		display: "flex",
		justifyContent: "center"
	}
}));

export const useFormStyles = makeStyles(theme => ({
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
