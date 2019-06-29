import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,
  avatarUrl: PropTypes.string,
  isPro: PropTypes.bool,
  name: PropTypes.string,
  email: PropTypes.string,
});

export const USER_AUTHORIZATION_PROP_TYPES = PropTypes.shape({
  email: PropTypes.string,
  password: PropTypes.string,
});
