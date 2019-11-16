import React from "react";
import { MapApp } from "./MapApp";
import MapForm from "./MapForm";

export const Map = props => (
	<div data-testid="map">
		<MapApp />
		<MapForm />
	</div>
);
