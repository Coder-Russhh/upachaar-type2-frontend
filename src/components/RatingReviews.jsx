import React, { useState } from "react";
import comments from "../static/StaticComments";
import { FaStar } from "react-icons/fa";

const RatingReviews = () => {
  const [reviews, setReviews] = useState(comments);

  return (
    <div className="h-[90vh] md:w-1/2 w-[100%] p-4 rounded-2xl overflow-auto border-black border-2 relative bg-color">
      <h1 className="text-3xl font-bold mb-4 text-center sticky top-0 z-1">
        <span className="bg-color rounded-lg p-2 text-white md:text-2xl text-xl">Ratings and Reviews</span>
      </h1>
      <ul>
        {reviews.map((review) => (
          <React.Fragment key={review.id}>
            <div className="bg-blue-700 h-[1px] w-full"></div>
            <li key={review.id} className="mb-4 bg-white rounded-lg">
              <h3 className="text-xl font-semibold">👉{review.user.username}</h3>
              <p>{review.body}</p>
              <div className="flex">
                  {Array.from({ length: review.rating }, (_, index) => (
                  <FaStar key={index} color="#FFD700" />
                ))}
              </div>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default RatingReviews;
