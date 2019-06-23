import * as React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';

import {Main} from '../main/main';
import {SignIn} from '../sign-in/sign-in';
import {Favourites} from '../favorites/favorites';
import OfferPage from '../offer-page/offer-page';
import withAuthorization from '../../hoc/with-authorization/with-authorization';
import {withPrivateRoutes} from '../../hoc/with-private-routes/with-private-routes';
import {withActiveItem} from '../../hoc/with-active-item/with-active-item';
import {
  getCities,
  getCitiesCoords,
  getCitiesZoom,
  getCity,
  getCityOffers,
  getIsAuthorized,
} from '../../reducers/selectors';
import {ActionCreator as CitiesActionCreator} from '../../reducers/cities/cities';
import {connect} from 'react-redux';
import {Operation as UserOperation} from '../../reducers/user/user';
import ApartmentPropsShape from '../../props/apartment';

const SignInWithAuthorization = withAuthorization(SignIn);
const FavouritesWithPrivateRoutes = withPrivateRoutes(Favourites);
const MainWithActiveItem = withActiveItem(Main);

export class App extends React.PureComponent {
  render() {
    const {
      offers,
      city,
      cities,
      handleCityChange,
      citiesCoords,
      citiesZoom,
      isAuthorized,
    } = this.props;

    const MainWithPropsAndActiveItem = () => {
      return (<MainWithActiveItem
        apartments={offers}
        city={city}
        cities={cities}
        handleCityChange={handleCityChange}
        citiesCoords={citiesCoords}
        citiesZoom={citiesZoom}
      />
      );
    };

    const redirectSignInPage = () => isAuthorized
      ? <Redirect to="/" />
      : <SignInWithAuthorization />;

    return (
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={MainWithPropsAndActiveItem} />
          <Route path="/login" render={redirectSignInPage} />
          <Route path="/favorites" component={FavouritesWithPrivateRoutes}/>
          <Route path="/offer/:id" component={OfferPage}/>
        </Switch>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(ApartmentPropsShape).isRequired,
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
  }).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  citiesCoords: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  citiesZoom: PropTypes.objectOf(PropTypes.number).isRequired,
  handleCityChange: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: getCity(state),
  cities: getCities(state),
  citiesCoords: getCitiesCoords(state),
  citiesZoom: getCitiesZoom(state),
  offers: getCityOffers(state),
  isAuthorized: getIsAuthorized(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleCityChange: (city) => dispatch(CitiesActionCreator.changeCity(city)),
  checkAuthorization: () => dispatch(UserOperation.checkAuthorization()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
