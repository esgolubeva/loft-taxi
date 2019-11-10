import React from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
	"pk.eyJ1IjoiZXNnb2x1YiIsImEiOiJjazJicXRoN3AwN2NnM21tZjd5aWNmeHVnIn0.-V1DvjvU7qGcA9fzZIEF8g";

export class MapApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lng: 13.41053,
			lat: 52.52437,
			zoom: 10
		};
		this.mapContainerRef = React.createRef();
	}

	componentDidMount() {
		const map = new mapboxgl.Map({
			container: this.mapContainerRef.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [this.state.lng, this.state.lat],
			zoom: this.state.zoom
		});

		map.on("move", () => {
			this.setState({
				lng: map.getCenter().lng.toFixed(4),
				lat: map.getCenter().lat.toFixed(4),
				zoom: map.getZoom().toFixed(2)
			});
		});
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
