import * as React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

import {history} from '../../history';
import ApartmentPropsShape from '../../props/apartment';

const DEFAULT_ICON = {
  iconUrl: `img/map-pin.svg`,
  iconSize: [27, 39],
};
const ACTIVE_ICON = {
  iconUrl: `img/active-pin.svg`,
  iconSize: [27, 39],
};

export class CitiesMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this._markers = {};
  }

  render() {
    return (
      <div id="map" style={{height: `100%`}} />
    );
  }

  componentDidMount() {
    this._createMap();
    this._renderMarkers();
    this._renderActiveMarker();
  }

  componentDidUpdate() {
    this._renderMarkers();
    this._renderActiveMarker();
  }

  componentWillUnmount() {
    this._map.remove();
    this._map = null;
  }

  _createMap() {
    const {city} = this.props;
    this._map = leaflet.map(`map`, {
      center: city.coords,
      zoom: city.zoom,
      zoomControl: false,
      marker: true
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);


  }

  _renderMarkers() {
    const {city, apartmentsCoords} = this.props;
    const icon = leaflet.icon(DEFAULT_ICON);
    this._map.setView(city.coords, city.zoom);

    let markers = [];

    apartmentsCoords.forEach((offer) => {
      const marker = leaflet
        .marker(offer.coordinates, {icon})
        .on(`click`, () => history.push(`/offer/${offer.id}`));
      this._markers[offer.id] = marker;
      markers.push(marker);
    });

    this._markersLayer = leaflet.layerGroup(markers);
    this._markersLayer.addTo(this._map);
  }

  _renderActiveMarker() {
    const {activeItem} = this.props;

    if (!activeItem) {
      return;
    }

    this._markers[activeItem.id].setIcon(leaflet.icon(ACTIVE_ICON));
  }
}

CitiesMap.propTypes = {
  apartmentsCoords: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
  })).isRequired,
  activeItem: ApartmentPropsShape,
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
  }).isRequired,
};