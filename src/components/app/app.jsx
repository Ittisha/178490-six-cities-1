import * as React from 'react';
import {Main} from '../main/main';
import {ActionCreators} from '../../redux/reducer';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class App extends React.PureComponent {
  render() {
    const {offers, city} = this.props;
    return (
      <Main apartments={offers} city={city} />
    );
  }
  componentDidMount() {
    const {onAppMounting} = this.props;
    onAppMounting();
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    isPremium: PropTypes.bool,
    isInBookmarks: PropTypes.bool,
    photoUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    cityName: PropTypes.string.isRequired,
    cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  onAppMounting: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: state.city,
  offers: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  onAppMounting: () => dispatch(ActionCreators.getOffers())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
