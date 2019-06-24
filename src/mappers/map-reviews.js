export const mapReviews = (reviews) => reviews.map((review) => ({
  comment: review.comment,
  date: review.date,
  id: review.id,
  rating: review.rating,
  user: {
    id: review.user.id,
    isPro: review.user.is_pro,
    name: review.user.name,
    avatar: review.user.avatar_url,
  },
}));
