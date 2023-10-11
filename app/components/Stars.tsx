import React from "react";

import { Review } from "@prisma/client";
import Image from "next/image";

import emptyStar from "../../public/icons/empty-star.png";
import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import { calculateReviewRatingAverage } from "../../utils/reviews";

export default function Stars({ reviews, rating }: { reviews: Review[], rating?: number }) {
  const reviewRating = rating || calculateReviewRatingAverage(reviews);

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((reviewRating - i).toFixed(1));

      if (difference >= 1) stars.push(fullStar);
      else if (difference > 0 && difference < 1) {
        if (difference <= 0.2) stars.push(emptyStar);
        else if (difference > 0.2 && difference <= 0.6) stars.push(halfStar);
        else stars.push(fullStar);
      } else stars.push(emptyStar);
    }

    return stars.map((star) => <Image alt="" src={star} width={15} height={15} />);
  };

  return <div className="flex items-center">{renderStars()}</div>;
}
