import * as React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {getRatingPercent} from '../../utils/get-rating-percent';
import {
  ApartmentTypes,
  SmallCardImage,
  DefaultCardImage,
  SmallBookmarkButton,
} from '../../consts';
import BookmarkButton from '../bookmark-button/bookmark-button';
import apartmentPropsShape from '../../props/apartment';

class Card extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handleImgClick = this._handleImgClick.bind(this);
  }

  render() {
    const {apartment, cardClass, imageWrapperClass, infoClass, isSmall} = this.props;
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

    const imgWidth = isSmall ? SmallCardImage.WIDTH : DefaultCardImage.WIDTH;
    const imgHeight = isSmall ? SmallCardImage.HEIGHT : DefaultCardImage.HEIGHT;

    return (
      <article className={`place-card ${cardClass}`}>
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className={`place-card__image-wrapper ${imageWrapperClass}`}>
          <a href="#" onClick={this._handleImgClick}>
            <img className="place-card__image" src={photoUrl} width={imgWidth} height={imgHeight} alt="Place image"/>
          </a>
        </div>
        <div className={`place-card__info ${infoClass}`}>
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <BookmarkButton
              offerId={id}
              isInBookmarks={isInBookmarks}
              className="place-card"
              width={SmallBookmarkButton.WIDTH}
              height={SmallBookmarkButton.HEIGHT}
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
          <p className="place-card__type">{ApartmentTypes[type.toUpperCase()]}</p>
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
  apartment: apartmentPropsShape.isRequired,
  onImgClick: PropTypes.func,
  cardClass: PropTypes.string.isRequired,
  infoClass: PropTypes.string,
  imageWrapperClass: PropTypes.string.isRequired,
  isSmall: PropTypes.bool,
};

Card.defaultProps = {
  infoClass: ``,
  isSmall: false,
};

export {Card};
