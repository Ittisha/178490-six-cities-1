import * as React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';

import Main from '../main/main';
import Header from '../header/header';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import OfferPage from '../offer-page/offer-page';
import {withFormSubmit} from '../../hoc/with-form-submit/with-form-submit';
import {withPrivateRoutes} from '../../hoc/with-private-routes/with-private-routes';
import {withActiveItem} from '../../hoc/with-active-item/with-active-item';
import {withSortedItems} from '../../hoc/with-sorted-items/with-sorted-items';
import {
  getCities,
  getCitiesCoords,
  getCitiesZoom,
  getCity,
  getCityOffers,
  getIsAuthorized, getOffersLoadingStatus,
} from '../../reducers/selectors';
import {ActionCreator as CitiesActionCreator} from '../../reducers/cities/cities';
import {connect} from 'react-redux';
import {Operation as UserOperation} from '../../reducers/user/user';
import apartmentPropsShape from '../../props/apartment';
import cityPropsShape from '../../props/city';
import {Operation as OffersOperation} from '../../reducers/offers/offers-data';

const SignInWithAuthorization = withFormSubmit(SignIn);
const FavouritesWithPrivateRoutes = withPrivateRoutes(Favorites);
const MainWithActiveItem = withActiveItem(withSortedItems(Main));

class App extends React.PureComponent {
  componentDidMount() {
    this.props.loadOffers();
  }

  render() {
    const {
      handleCityChange,
      isAuthorized,
      isLoading,
    } = this.props;

    const MainWithPropsAndActiveItem = () => {
      return (<MainWithActiveItem
        handleCityChange={handleCityChange}
      />
      );
    };

    const redirectSignInPage = () => isAuthorized
      ? <Redirect to="/" />
      : <SignInWithAuthorization />;

    return isLoading ? <div className={`loader`}>Loading</div> : (
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" exact component={MainWithPropsAndActiveItem} />
          <Route path="/login" render={redirectSignInPage} />
          <Route path="/favorites" component={FavouritesWithPrivateRoutes}/>
          <Route path="/offer/:id" component={OfferPage}/>
          <Redirect from="*" to="/" />
        </Switch>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  apartments: PropTypes.arrayOf(apartmentPropsShape).isRequired,
  city: cityPropsShape.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  citiesCoords: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  citiesZoom: PropTypes.objectOf(PropTypes.number).isRequired,
  handleCityChange: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadOffers: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: getCity(state),
  cities: getCities(state),
  citiesCoords: getCitiesCoords(state),
  citiesZoom: getCitiesZoom(state),
  apartments: getCityOffers(state),
  isAuthorized: getIsAuthorized(state),
  isLoading: getOffersLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleCityChange: (city) => dispatch(CitiesActionCreator.changeCity(city)),
  checkAuthorization: () => dispatch(UserOperation.checkAuthorization()),
  loadOffers: () => dispatch(OffersOperation.loadOffers()),
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
