import React from "react";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { fetchRouteRequest, getRouteCoords } from "../../modules/route/";
import { drawRoute } from "./drawRoute";

mapboxgl.accessToken =
	"pk.eyJ1IjoiZXNnb2x1YiIsImEiOiJjazJicXRoN3AwN2NnM21tZjd5aWNmeHVnIn0.-V1DvjvU7qGcA9fzZIEF8g";
class MapApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lng: 30.31413,
			lat: 59.93863,
			zoom: 10
		};
		this.map = null;
		this.mapContainerRef = React.createRef();
	}

	componentDidMount() {
		this.map = new mapboxgl.Map({
			container: this.mapContainerRef.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [this.state.lng, this.state.lat],
			zoom: this.state.zoom
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			const { routeCoords } = this.props;

			if (this.map.getLayer("route")) {
				this.map.flyTo({
					center: [this.state.lng, this.state.lat],
					zoom: this.state.zoom
				});
				this.map.removeLayer("route");
				this.map.removeSource("route");
			}
			if (routeCoords.length) {
				drawRoute(this.map, routeCoords);
			}
		}
	}

	render() {
		const style = {
			position: "absolute",
			top: 0,
			right: 0,
			left: 0,
			bottom: 0,
			width: "100%",
			height: window.innerHeight - 72 // TODO add header height
		};

		return (
			<div style={{ position: "relative", zIndex: -10 }}>
				<div
					style={style}
					ref={this.mapContainerRef}
					className="mapContainer"
				/>
			</div>
		);
	}
}

MapApp.propTypes = {
	routeCoords: PropTypes.array
};

const mapStateToProps = state => ({
	routeCoords: getRouteCoords(state)
});

const mapDispatchToProps = { fetchRouteRequest };

export default connect(mapStateToProps, mapDispatchToProps)(MapApp);
