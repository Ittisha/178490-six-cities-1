import * as React from 'react';
import PropTypes from "prop-types";
import {Review} from '../review/review';
import userPropTypes from '../../props/user';

export const ReviewsList = ({reviews}) => {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review
          key={review.id}
          user={review.user}
          id={review.id}
          comment={review.comment}
          date={review.date}
          rating={review.rating}
        />
      ))}
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    user: userPropTypes,
    rating: PropTypes.number,
    comment: PropTypes.string,
    date: PropTypes.string,
  }))
};
