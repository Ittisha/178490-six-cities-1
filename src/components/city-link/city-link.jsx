import * as React from 'react';
import PropTypes from 'prop-types';

export class CityLink extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(evt) {
    evt.preventDefault();
    const {city, onLinkClick, cityCoords} = this.props;
    onLinkClick({name: city, coords: cityCoords});
  }
  render() {
    const {city, isActive} = this.props;
    const defaultClassName = `locations__item-link tabs__item`;
    const className = isActive ? `${defaultClassName} tabs__item--active` : defaultClassName;
    return (
      <li className="locations__item">
        <a
          className={className}
          onClick={this.onClick}
          href="#"
        >
          <span>{city}</span>
        </a>
      </li>
    );
  }
}

CityLink.propTypes = {
  city: PropTypes.string.isRequired,
  cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  isActive: PropTypes.bool.isRequired,
  onLinkClick: PropTypes.func.isRequired,
};
