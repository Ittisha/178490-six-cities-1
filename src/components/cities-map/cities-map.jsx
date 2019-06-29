import * as React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

import ApartmentPropsShape from '../../props/apartment';
import ReactResizeDetector from 'react-resize-detector';
import {history} from '../../history';

const DEFAULT_ICON = {
  iconUrl: `/img/map-pin.svg`,
  iconSize: [27, 39],
};
const ACTIVE_ICON = {
  iconUrl: `/img/active-pin.svg`,
  iconSize: [27, 39],
};

class CitiesMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this._markers = {};
  }

  componentDidMount() {
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
    this._setMapCenter();
    this._renderMarkers();
    this._renderActiveMarker();
  }

  componentDidUpdate() {
    this._removeMarkers();
    this._setMapCenter();
    this._renderMarkers();
    this._renderActiveMarker();
  }

  componentWillUnmount() {
    this._map.remove();
    this._map = null;
  }

  render() {
    return (
      <div id="map" style={{height: `100%`}} >
        <ReactResizeDetector handleHeight handleWidth onResize={this._handleHeightResize.bind(this)}/>
      </div>
    );
  }

  _setMapCenter() {
    const {city} = this.props;
    this._map.setView(city.coords, city.zoom);
  }

  _renderMarkers() {
    const {apartmentsCoords} = this.props;
    const icon = leaflet.icon(DEFAULT_ICON);
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

  _removeMarkers() {
    this._markersLayer.clearLayers();
    this._markersLayer = null;
    this._markers = {};
  }

  _renderActiveMarker() {
    const {activeItem} = this.props;

    if (!activeItem) {
      return;
    }

    this._markers[activeItem.id].setIcon(leaflet.icon(ACTIVE_ICON));
  }

  _handleHeightResize() {
    this._map.invalidateSize();
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

export {CitiesMap};
