import * as React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

export class CitiesMap extends React.PureComponent {

  render() {
    return (
      <div id="map" style={{height: `100%`}} />
    );
  }

  componentDidMount() {
    this._createMap();
  }

  componentWillUnmount() {
    this._map.remove();
  }

  _createMap() {
    const {initCoords, apartmentsCoords} = this.props;
    const icon = leaflet.icon({
      iconUrl: `img/map-pin.svg`,
      iconSize: [27, 39],
    });
    const zoom = 12;
    this._map = leaflet.map(`map`, {
      center: initCoords,
      zoom,
      zoomControl: false,
      marker: true
    });

    this._map.setView(initCoords, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    apartmentsCoords.map((offer) => {
      leaflet
        .marker(offer.coordinates, {icon})
        .addTo(this._map);
    });
  }
}

CitiesMap.propTypes = {
  initCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  apartmentsCoords: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
};
