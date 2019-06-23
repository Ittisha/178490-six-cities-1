export const mapOffers = (offers) => offers.map((offer) => ({
  bedrooms: offer.bedrooms,
  cityName: offer.city.name,
  cityCoords: [
    offer.city.location.latitude,
    offer.city.location.longitude
  ],
  cityZoom: offer.city.location.zoom,
  coordinates: [
    offer.location.latitude,
    offer.location.longitude
  ],
  description: offer.description,
  goods: offer.goods,
  host: {
    id: offer.host.id,
    isPro: offer.host.is_pro,
    name: offer.host.name,
    avatar: offer.host.avatar_url,
  },
  id: offer.id,
  isInBookmarks: offer.is_favorite,
  images: offer.images,
  photoUrl: offer.preview_image,
  isPremium: offer.is_premium,
  maxAdults: offer.max_adults,
  price: offer.price,
  rating: offer.rating,
  title: offer.title,
  type: offer.type,
  zoom: offer.location.zoom,
}));
