import * as React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

export class Map extends React.PureComponent {
  render() {
    return (
      <div id="map" style={{height: `100%`, minHeight: 816}} />
    );
  }

  componentDidMount() {
    this._createMap();
  }

  componentWillUnmount() {
    this.map.remove();
  }

  _createMap() {
    const {initCoords, apartmentsCoords} = this.props;
    const icon = leaflet.icon({
      iconUrl: `img/map-pin.svg`,
      iconSize: [30, 30],
    });
    const zoom = 12;
    try {
      const map = leaflet.map(`map`, {
        center: initCoords,
        zoom,
        zoomControl: false,
        marker: true
      });

      map.setView(initCoords, zoom);

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(map);

      apartmentsCoords.map((offer) => {
        leaflet
          .marker(offer.coordinates, {icon})
          .addTo(map);
      });
    } catch (e) {
      // return undefined if leaflet is down. container should contain bg_image
      return;
    }
  }
}

Map.propTypes = {
  initCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  apartmentsCoords: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
};
