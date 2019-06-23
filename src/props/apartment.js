import PropTypes from 'prop-types';

import hostPropTypes from './host';

export default PropTypes.shape({
  bedrooms: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string),
  host: hostPropTypes.isRequired,
  isPremium: PropTypes.bool,
  isInBookmarks: PropTypes.bool,
  photoUrl: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  maxAdults: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  cityName: PropTypes.string.isRequired,
  cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  cityZoom: PropTypes.number.isRequired,
});
