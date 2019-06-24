import * as React from 'react';
import PropTypes from 'prop-types';

import {Card} from '../card/card';

export const CardList = ({apartments, setActiveOffer, cardClass, cardListClass}) => (
  <div className={`places__list ${cardListClass}`}>
    {apartments.map((apartment) => (
      <Card
        key={apartment.id}
        apartment={apartment}
        onImgClick={setActiveOffer}
        cardClass={cardClass}
      />
    ))}
  </div>
);

CardList.propTypes = {
  apartments: PropTypes.arrayOf(PropTypes.shape({
    isPremium: PropTypes.bool,
    isInBookmarks: PropTypes.bool,
    photoUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
  setActiveOffer: PropTypes.func,
  cardClass: PropTypes.string.isRequired,
  cardListClass: PropTypes.string.isRequired,
};
