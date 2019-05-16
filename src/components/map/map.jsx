import * as React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

export class Map extends React.PureComponent {
  render() {
    return (
      <div id="map" style={{height: 800, marginTop: 25, marginBottom: 25}} />
    );
  }

  componentDidMount() {
    this._createMap();
  }

  componentWillUnmount() {
    this.map.remove();
  }

  _createMap() {
    const {initCoords, offersCoords} = this.props;
    const icon = leaflet.icon({
      iconUrl: `img/map-pin.svg`,
      iconSize: [30, 30],
    });
    const zoom = 12;
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

    offersCoords.map((offer) => {
      leaflet
        .marker(offer.coordinates, {icon})
        .addTo(map);
    });
  }
}

Map.propTypes = {
  initCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  offersCoords: PropTypes.any // TODO
};
