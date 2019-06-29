import * as React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Operation} from '../../reducers/favorites/favorites';

class BookmarkButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleButtonClick = this._handleButtonClick.bind(this);
  }

  render() {
    const {
      className,
      isInBookmarks,
      width,
      height,
    } = this.props;
    const activeButtonClass = isInBookmarks ? `${className}__bookmark-button--active` : ``;
    const bookmarkHiddenText = isInBookmarks ? `In bookmarks` : `To bookmarks`;

    return <button
      className={`${className}__bookmark-button button ${activeButtonClass}`}
      type="button"
      onClick={this._handleButtonClick}
    >
      <svg
        className={`${className}__bookmark-icon`}
        width={width}
        height={height}
      >
        <use xlinkHref="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">{bookmarkHiddenText}</span>
    </button>;
  }

  _handleButtonClick() {
    const {
      isInBookmarks,
      offerId,
      updateFavorites,
    } = this.props;

    updateFavorites(Number(!isInBookmarks), offerId);
  }
}

BookmarkButton.propTypes = {
  offerId: PropTypes.number.isRequired,
  isInBookmarks: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  updateFavorites: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateFavorites: (isFavorite, id) => dispatch(Operation.updateFavorite(isFavorite, id))
});

export {BookmarkButton};
export default connect(null, mapDispatchToProps)(BookmarkButton);
