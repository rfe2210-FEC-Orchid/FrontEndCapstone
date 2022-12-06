import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx';
import WriteAReview from './WriteAReview.jsx';

const ReviewsList = ({productID, reviews, reviewCount, renderCount, handleMoreReviews}) => {
  const [isWritingReview, setIsWritingReview] = useState(false); //for Modal

  return (
    <div>
      <div>For dev: Review Count {reviewCount}</div>
      <div>For dev: Render Count {renderCount}</div>
      <div>
        <span>{reviewCount +" reviews, sorted by "}</span>
        <button>relevance</button>
      </div>
      <div>
        {reviews.slice(0, renderCount).map((review) => <ReviewTile key={review.review_id} review={review}/>)}
      </div>
      {(reviewCount > renderCount) && (reviewCount > 2) ? <button onClick={handleMoreReviews}>More Reviews</button> : null}
      <button onClick={() => setIsWritingReview(true)}>Add a Review ➕</button>
      <WriteAReview isWritingReview={isWritingReview} onClose={() => setIsWritingReview(false)}/>
    </div>
  )
}

export default ReviewsList;