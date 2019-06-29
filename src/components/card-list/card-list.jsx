import * as React from 'react';
import PropTypes from 'prop-types';

import {Card} from '../card/card';
import apartmentPropsShape from '../../props/apartment';

const CardList = ({apartments, setActiveOffer, cardClass, cardListClass, imageWrapperClass}) => (
  <div className={`places__list ${cardListClass}`}>
    {apartments.map((apartment) => (
      <Card
        key={apartment.id}
        apartment={apartment}
        onImgClick={setActiveOffer}
        cardClass={cardClass}
        imageWrapperClass={imageWrapperClass}
      />
    ))}
  </div>
);

CardList.propTypes = {
  apartments: PropTypes.arrayOf(apartmentPropsShape).isRequired,
  setActiveOffer: PropTypes.func,
  cardClass: PropTypes.string.isRequired,
  cardListClass: PropTypes.string.isRequired,
  imageWrapperClass: PropTypes.string.isRequired,
};

export {CardList};
