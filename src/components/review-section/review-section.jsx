import * as React from 'react';
import {connect} from 'react-redux';

import {ReviewsList} from '../reviews-list/reviews-list';
import {getIsAuthorized, getReviews} from '../../reducers/selectors';
import {Operation} from '../../reducers/review/review';
import PropTypes from 'prop-types';
import userPropTypes from '../../props/user';
import {MAX_REVIEWS_NUMBER} from '../../consts';
import {withFormSubmit} from '../../hoc/with-form-submit/with-form-submit';
import ReviewForm from '../review-form/review-form';

const ReviewFormWithFormSubmit = withFormSubmit(ReviewForm);

class ReviewSection extends React.PureComponent {
  componentDidMount() {
    const {loadReviews, offerId} = this.props;
    loadReviews(offerId);
  }

  render() {
    const {
      reviews,
      offerId,
      isAuthorized,
    } = this.props;

    const hasReviewsToShow = reviews && reviews.length !== 0;

    const reviewsToRender = reviews.slice(0, MAX_REVIEWS_NUMBER);

    return (
      <section className="property__reviews reviews">
        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
        {hasReviewsToShow && <ReviewsList reviews={reviewsToRender} />}
        {isAuthorized && <ReviewFormWithFormSubmit offerId={offerId}/>}
      </section>
    );
  }
}

ReviewSection.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    user: userPropTypes,
    rating: PropTypes.number,
    comment: PropTypes.string,
    date: PropTypes.string,
  })),
  offerId: PropTypes.number.isRequired,
  loadReviews: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  reviews: getReviews(state),
  isAuthorized: getIsAuthorized(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadReviews: (id) => dispatch(Operation.loadReviews(id))
});

export {ReviewSection};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewSection);
