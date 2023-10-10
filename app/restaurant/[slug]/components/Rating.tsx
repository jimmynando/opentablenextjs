import React from "react";
import { Review } from "@prisma/client";

import { calculateReviewRatingAverage } from "../../../../utils/reviews";
import StarsComponent from "./Stars";

export default function Rating({ reviews }: { reviews: Review[] }) {
  const ratingAverage = calculateReviewRatingAverage(reviews);

  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <StarsComponent reviews={reviews} />
        <p className="text-reg ml-3">{ratingAverage.toFixed(1)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">
          {reviews.length} Review{reviews.length === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
