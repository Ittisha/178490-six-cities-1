import * as React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

const ZOOM = 12;

export class CitiesMap extends React.PureComponent {
  render() {
    return (
      <div id="map" style={{height: `100%`}} />
    );
  }

  componentDidMount() {
    this._createMap();
    setTimeout(() => this._map.invalidateSize(true), 400);
  }

  componentDidUpdate() {
    this._updateMarkers();
  }

  componentWillUnmount() {
    this._map.remove();
    this._map = null;
  }

  _createMap() {
    const {initCoords} = this.props;
    this._map = leaflet.map(`map`, {
      center: initCoords,
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    this._updateMarkers();
  }

  _updateMarkers() {
    const {initCoords, apartmentsCoords} = this.props;
    const icon = leaflet.icon({
      iconUrl: `img/map-pin.svg`,
      iconSize: [27, 39],
    });
    this._map.setView(initCoords, ZOOM);
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
