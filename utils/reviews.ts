import { Review } from "@prisma/client";

export const calculateReviewRatingAverage = (reviews: Review[]) => {
  if (!reviews.length) return 0;

  return (
    reviews.reduce((sum, review) => {
      return sum + review.rating;
    }, 0) / reviews.length
  );
};

export const renderRatingLabel = (reviews: Review[]) => {
  const rating = calculateReviewRatingAverage(reviews);

  if (rating > 4) return "Awesome";
  else if (rating <= 4 && rating > 3) return "Good";
  else if (rating <= 3 && rating > 0) return "Average";

  return "";
};
