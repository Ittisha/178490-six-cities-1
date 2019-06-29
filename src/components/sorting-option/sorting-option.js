import * as React from 'react';
import PropTypes from 'prop-types';

import {SortingOptions} from '../../consts';

class SortingOption extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handleOptionClick = this._handleOptionClick.bind(this);
  }

  render() {
    const {
      option,
      isActive,
    } = this.props;
    const activeClass = isActive ? `places__option--active` : ``;

    return <li
      className={`places__option ${activeClass}`}
      tabIndex={0}
      onClick={this._handleOptionClick}
    >
      {SortingOptions[option]}
    </li>;
  }

  _handleOptionClick() {
    const {
      option,
      onOptionSelect,
    } = this.props;

    onOptionSelect(option);
  }
}

SortingOption.propTypes = {
  option: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onOptionSelect: PropTypes.func.isRequired,
};

export {SortingOption};
