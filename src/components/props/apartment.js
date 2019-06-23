import PropTypes from 'prop-types';

export default PropTypes.shape({
  isPremium: PropTypes.bool,
  isInBookmarks: PropTypes.bool,
  photoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  cityName: PropTypes.string.isRequired,
  cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
});
