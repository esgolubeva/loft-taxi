import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const NavLink = React.forwardRef((props, ref) => (
	<RouterLink innerRef={ref} {...props} />
));

NavLink.displayName = "NavLink";
