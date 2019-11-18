import React from "react";
import MapApp from "./MapApp";
import Order from "./Order";

export const Map = () => (
	<div data-testid="map">
		<MapApp />
		<Order />
	</div>
);
