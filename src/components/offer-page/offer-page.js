import * as React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getNearestOffers, getOffer} from '../../reducers/selectors';
import offerPropTypes from '../../props/apartment';
import {addPluralS} from '../../utils/addPluralS';
import {APARTMENT_TYPES} from '../../consts';
import {getRatingPercent} from '../../utils/get-rating-percent';
import ReviewSection from '../review-section/review-section';
import {CitiesMap} from '../cities-map/cities-map';
import {CardList} from '../card-list/card-list';

const MAX_PHOTO_NUMBER = 6;

export const OfferPage = ({offer, nearestOffers}) => {
  const {
    images,
    title,
    id,
    isPremium,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
    rating,
    cityName,
    cityCoords,
    cityZoom,
  } = offer;

  const city = {
    name: cityName,
    coords: cityCoords,
    zoom: cityZoom,
  };

  const apartmentsCoords = [...nearestOffers, offer].map(({id: idCurrent, coordinates, zoom}) => ({id: idCurrent, coordinates, zoom}));

  const wordBedroomForm = addPluralS(bedrooms, `Bedroom`);
  const wordAdultForm = addPluralS(maxAdults, `adult`);

  const premiumPropertyMark = isPremium
    ? (<div className="property__mark"><span>Premium</span></div>)
    : null;
  const proHostAvatarClass = host.isPro ? `property__avatar-wrapper--pro` : `;`;
  const proHostStatus = host.isPro ? <span className="property__user-status">Pro</span> : null;

  return (
    <React.Fragment>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, MAX_PHOTO_NUMBER).map((image, i) => <div
                key={`image-${id}-${i}`}
                className="property__image-wrapper"
              >
                <img className="property__image" src={image} alt={title} />
              </div>)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {premiumPropertyMark}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getRatingPercent(rating)}`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {APARTMENT_TYPES[type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${bedrooms} ${wordBedroomForm}`}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {`${maxAdults} ${wordAdultForm}`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((item, i) => <li
                    key={`good-${id}-${i}`}
                    className="property__inside-item"
                  >
                    {item}
                  </li>)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${proHostAvatarClass}`}>
                    <img
                      className="property__avatar user__avatar"
                      src={`/${host.avatar}`}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  {proHostStatus}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <ReviewSection offerId={id} />
            </div>
          </div>
          <section className="property__map map">
            <CitiesMap
              apartmentsCoords={apartmentsCoords}
              city={city}
              activeItem={offer}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CardList
              apartments={nearestOffers}
              cardListClass={`near-places__list`}
              cardClass={`near-places__card`}
            />
          </section>
        </div>
      </main>
    </React.Fragment>
  );
};

OfferPage.propTypes = {
  offer: offerPropTypes,
  nearestOffers: PropTypes.arrayOf(offerPropTypes),
};

const mapStateToProps = (state, ownProps) => {
  const currentOfferId = ownProps.match.params.id;
  const getNearestSelector = getNearestOffers(currentOfferId, 3);
  return Object.assign({}, ownProps, {
    offer: getOffer(state, currentOfferId),
    nearestOffers: getNearestSelector(state),
  });
};

export default connect(mapStateToProps)(OfferPage);
