import * as React from 'react';
import PropTypes from 'prop-types';

import {SortingOptions} from '../../consts';
import {SortingOption} from '../sorting-option/sorting-option';

class Sorting extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handleOptionSelect = this._handleOptionSelect.bind(this);
  }

  render() {
    const {
      activeItem,
      isOpened,
      onSortingToggle,
    } = this.props;

    const openedClass = isOpened ? `places__options--opened` : ``;
    const optionType = activeItem ? SortingOptions[activeItem] : SortingOptions.POPULAR;

    return <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span className="places__sorting-type" tabIndex={0} onClick={onSortingToggle}>
        {optionType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${openedClass}`}>
        {Object.keys(SortingOptions).map((option) => <SortingOption
          key={option}
          option={option}
          isActive={activeItem === option}
          onOptionSelect={this._handleOptionSelect}
        />)}
      </ul>
    </form>;
  }

  _handleOptionSelect(option) {
    const {setActiveItem, onOptionChange, onSortingToggle} = this.props;

    onOptionChange(option);
    setActiveItem(option);
    onSortingToggle(option);
  }
}

Sorting.propTypes = {
  activeItem: PropTypes.string,
  isOpened: PropTypes.bool,
  onSortingToggle: PropTypes.func.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  onOptionChange: PropTypes.func.isRequired,
};

export {Sorting};
