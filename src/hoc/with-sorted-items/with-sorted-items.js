import * as React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {SortingOptions} from '../../consts';
import {sortOffers} from '../../utils/sortOffers';
import {getCityOffers} from '../../reducers/selectors';
import ApartmentPropsShape from '../../props/apartment';

const withSortedItems = (Component) => {
  class WithSortedItems extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        option: SortingOptions.POPULAR,
      };

      this._handleOptionChange = this._handleOptionChange.bind(this);
    }

    render() {
      const {option} = this.state;

      const sortedOffers = [...this.props.apartments].sort(sortOffers(option));

      return <Component
        {...this.props}
        apartments={sortedOffers}
        onOptionChange={this._handleOptionChange}
      />;
    }

    _handleOptionChange(option) {
      this.setState({
        option: SortingOptions[option],
      });
    }
  }

  WithSortedItems.propTypes = {
    apartments: PropTypes.arrayOf(ApartmentPropsShape).isRequired,
  };

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
    apartments: getCityOffers(state),
  });

  return connect(mapStateToProps)(WithSortedItems);
};

export {withSortedItems};
