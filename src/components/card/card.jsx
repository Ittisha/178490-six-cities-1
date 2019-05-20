import * as React from 'react';
import PropTypes from 'prop-types';

export class Card extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handleImgClick = this._handleImgClick.bind(this);
  }

  render() {
    const {apartment} = this.props;
    const {isPremium, isInBookmarks, price, rating, photoUrl, title, type} = apartment;
    const bookmarkButtonClasses = isInBookmarks
      ? `place-card__bookmark-button place-card__bookmark-button--active button`
      : `place-card__bookmark-button button`;
    const bookmarkHiddenText = isInBookmarks ? `In bookmarks` : `To bookmarks`;
    return (
      <article className="cities__place-card place-card">
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
            <button className={bookmarkButtonClasses} type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">{bookmarkHiddenText}</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: rating}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{title}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>);
  }

  _handleImgClick() {
    const {apartment, onImgClick} = this.props;
    onImgClick(apartment.id);
  }
}

Card.propTypes = {
  apartment: PropTypes.shape({
    isPremium: PropTypes.bool.isRequired,
    isInBookmarks: PropTypes.bool.isRequired,
    photoUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  onImgClick: PropTypes.func.isRequired,
};
