import * as React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {getRatingPercent} from '../../utils/get-rating-percent';
import {APARTMENT_TYPES} from '../../consts';
import BookmarkButton from '../bookmark-button/bookmark-button';

export class Card extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handleImgClick = this._handleImgClick.bind(this);
  }

  render() {
    const {apartment, cardClass} = this.props;
    const {
      isPremium,
      isInBookmarks,
      price,
      rating,
      photoUrl,
      title,
      type,
      id
    } = apartment;

    return (
      <article className={`place-card ${cardClass}`}>
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#" onClick={this._handleImgClick}>
            <img className="place-card__image" src={photoUrl} width="260" height="200" alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <BookmarkButton
              offerId={id}
              isInBookmarks={isInBookmarks}
              className="place-card"
              width={18}
              height={19}
            />
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `${getRatingPercent(rating)}`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={`/offer/${id}`}>{title}</Link>
          </h2>
          <p className="place-card__type">{APARTMENT_TYPES[type]}</p>
        </div>
      </article>);
  }

  _handleImgClick() {
    const {apartment, onImgClick} = this.props;
    if (typeof onImgClick === `function`) {
      onImgClick(apartment);
    }
  }
}

Card.propTypes = {
  apartment: PropTypes.shape({
    isPremium: PropTypes.bool.isRequired,
    isInBookmarks: PropTypes.bool.isRequired,
    photoUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  onImgClick: PropTypes.func,
  cardClass: PropTypes.string.isRequired,
};
