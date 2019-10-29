import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#fff"
		},
		secondary: {
			main: "#ccc"
		}
	},
	typography: {
		button: {
			textTransform: "none"
		}
	}
});
