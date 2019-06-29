import * as React from 'react';
import PropTypes from 'prop-types';

class CityLink extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  render() {
    const {city, isActive, isDiv} = this.props;
    const defaultClassName = `locations__item-link tabs__item`;
    const className = isActive ? `${defaultClassName} tabs__item--active` : defaultClassName;
    const CustomWrapperTag = isDiv ? `div` : `li`;
    return (
      <CustomWrapperTag className="locations__item">
        <a
          className={className}
          onClick={this._handleClick}
          href="#"
        >
          <span>{city}</span>
        </a>
      </CustomWrapperTag>
    );
  }

  _handleClick(evt) {
    evt.preventDefault();
    const {city, onLinkClick, cityCoords, cityZoom} = this.props;
    onLinkClick({name: city, coords: cityCoords, zoom: cityZoom});
  }
}

CityLink.propTypes = {
  city: PropTypes.string.isRequired,
  cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  cityZoom: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  isDiv: PropTypes.bool,
};

CityLink.defaultProps = {
  isDiv: false,
};

export {CityLink};
