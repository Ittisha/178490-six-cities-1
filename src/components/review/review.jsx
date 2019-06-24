import * as React from 'react';
import {getRatingPercent} from '../../utils/get-rating-percent';
import PropTypes from "prop-types";
import userPropTypes from '../../props/user';
import {MONTHS, ISO_END_DAY_ORDER_NUMBER, ISO_END_YEAR_ORDER_NUMBER} from '../../consts';

export const Review = ({user, rating, comment, date}) => {
  const dateTime = date.slice(0, ISO_END_DAY_ORDER_NUMBER);
  const year = date.slice(0, ISO_END_YEAR_ORDER_NUMBER);
  const month = MONTHS[new Date(date).getMonth()];

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={`${user.avatar}`}
            width="54"
            height="54"
            alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getRatingPercent(rating)}`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={dateTime}>
          {`${month} ${year}`}
        </time>
      </div>
    </li>
  );
};

Review.propTypes = {
  user: userPropTypes,
  rating: PropTypes.number,
  comment: PropTypes.string,
  date: PropTypes.string,
};
