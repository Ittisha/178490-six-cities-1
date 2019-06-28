import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Review} from '../../consts';
import {Operation} from '../../reducers/review/review';

export class ReviewForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this._formRef = React.createRef();

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  render() {
    const {disabled, onChange} = this.props;
    return (
      <form
        className="reviews__form form"
        action="#"
        method="post"
        onSubmit={this._handleFormSubmit}
        onChange={onChange}
        ref={this._formRef}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value="5"
            id="5-stars"
            type="radio"
            required={true}
          />
          <label
            htmlFor="5-stars"
            className="reviews__rating-label form__rating-label"
            title="perfect"
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value="4"
            id="4-stars"
            type="radio"
            required={true}
          />
          <label
            htmlFor="4-stars"
            className="reviews__rating-label form__rating-label"
            title="good"
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value="3"
            id="3-stars"
            type="radio"
            required={true}
          />
          <label
            htmlFor="3-stars"
            className="reviews__rating-label form__rating-label"
            title="not bad"
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value="2"
            id="2-stars"
            type="radio"
            required={true}
          />
          <label
            htmlFor="2-stars"
            className="reviews__rating-label form__rating-label"
            title="badly"
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value="1"
            id="1-star"
            type="radio"
            required={true}
          />
          <label
            htmlFor="1-star"
            className="reviews__rating-label form__rating-label"
            title="terribly"
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          id="comment"
          name="comment"
          placeholder="Tell how was your stay, what you like and what can be improved"
          minLength={Review.MIN_LENGTH}
          maxLength={Review.MAX_LENGTH}
          required
        ></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
            stay with at least <b className="reviews__text-amount">{Review.MIN_LENGTH} characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={disabled}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const {offerId, formData, onSubmit, onFormSending} = this.props;
    onFormSending(Object.assign({}, formData, {id: offerId}));
    onSubmit();
    this._formRef.current.reset();
  }
}

ReviewForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFormSending: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  formData: PropTypes.shape({
    rating: PropTypes.string,
    comment: PropTypes.string,
  }),
  offerId: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onFormSending: (data) => dispatch(Operation.sendReview(data)),
});

export default connect(null, mapDispatchToProps)(ReviewForm);
