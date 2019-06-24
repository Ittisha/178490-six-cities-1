import * as React from 'react';

import {ReviewsList} from 'src/components/reviews-list/reviews-list';

export class ReviewSection extends React.PureComponent {
  render() {
    /*    const {
      reviews,
      offerId,
    } = this.props;*/

    return (
      <section className="property__reviews reviews">
        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{/* reviews.length */}</span></h2>
        <ReviewsList />
      </section>
    );
  }
}

