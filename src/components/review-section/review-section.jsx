import * as React from 'react';
import {connect} from 'react-redux';

import {ReviewsList} from '../reviews-list/reviews-list';
import {getReviews} from '../../reducers/selectors';
import {Operation} from '../../reducers/review/review';
import PropTypes from 'prop-types';
import userPropTypes from '../../props/user';
import {MAX_REVIEWS_NUMBER} from '../../consts';

export class ReviewSection extends React.PureComponent {
  render() {
    const {
      reviews,
    } = this.props;

    if (!reviews || reviews.length === 0) {
      return null;
    }

    const reviewsToRender = reviews.slice(0, MAX_REVIEWS_NUMBER + 1);

    return (
      <section className="property__reviews reviews">
        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
        <ReviewsList reviews={reviewsToRender} />
      </section>
    );
  }

  componentDidMount() {
    const {loadReviews, offerId} = this.props;
    loadReviews(offerId);
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
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  reviews: getReviews(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadReviews: (id) => dispatch(Operation.loadReviews(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSection);
