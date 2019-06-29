import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {history} from '../../history';
import {CityLink} from '../city-link/city-link';
import {Card} from '../card/card';
import {Operation} from '../../reducers/favorites/favorites';
import {getFavorites} from '../../reducers/selectors';
import {ActionCreator as CitiesActionCreator} from '../../reducers/cities/cities';

export class Favorites extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handleLinkClick = this._handleLinkClick.bind(this);
  }
  componentDidMount() {
    const {loadFavorites} = this.props;
    loadFavorites();
  }

  render() {
    const {favorites} = this.props;
    const hasFavorites = favorites && Object.keys(favorites).length !== 0;
    const emptyClass = !hasFavorites ? `page__main--favorites-empty` : ``;

    return (<React.Fragment>
      <main className={`page__main page__main--favorites ${emptyClass}`}>
        <div className="page__favorites-container container">
          {!hasFavorites && (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
              </div>
            </section>
          )}
          {hasFavorites && (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(favorites).map(([city, offers]) => <li
                  key={`favorite-${city}`}
                  className="favorites__locations-items"
                >
                  <div className="favorites__locations locations locations--current">
                    <CityLink
                      city={city}
                      cityCoords={offers[0].cityCoords}
                      cityZoom={offers[0].cityZoom}
                      isActive={true}
                      isDiv={true}
                      onLinkClick={this._handleLinkClick}
                    />
                  </div>
                  <div className="favorites__places">
                    {offers.map((offer) => <Card
                      key={`${city}-${offer.id}`}
                      cardClass="favorites__card"
                      imageWrapperClass="favorites__image-wrapper"
                      infoClass="favorites__card-info"
                      apartment={offer}
                      isSmall={true}
                    />)}
                  </div>
                </li>)}
              </ul>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <NavLink
          to={`/`}
          className="footer__logo-link"
        >
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </NavLink>
      </footer>
    </React.Fragment>
    );
  }

  _handleLinkClick(cityToChange) {
    const {changeCity} = this.props;
    changeCity(cityToChange);
    history.push(`/`);
  }
}

Favorites.propTypes = {
  loadFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.object.isRequired,
  changeCity: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  favorites: getFavorites(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorites: () => dispatch(Operation.loadFavorites()),
  changeCity: (city) => dispatch(CitiesActionCreator.changeCity(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
