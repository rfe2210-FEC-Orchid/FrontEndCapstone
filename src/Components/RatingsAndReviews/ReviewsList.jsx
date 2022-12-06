import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx';
import WriteAReview from './WriteAReview.jsx';

const ReviewsList = ({productID}) => {

  const [reviews, setReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [renderCount, setRenderCount] = useState(2);
  const [isWritingReview, setIsWritingReview] = useState(false); //for Modal

  useEffect(()=>{
    axios.get(`http://localhost:3000/reviews?product_id=${productID}`, {header: {'Access-Control-Allow-Origin': '*'}})
      .then((data) => {
        console.log(data.data); //data.data.count has how many reviews
        setReviews(data.data.results);
        setReviewCount(data.data.count);
        if (data.data.count < 2) {
          setRenderCount(data.data.count);
        }
      })
      .catch((err) => {
        console.error(err);
      })
  },[]);

  const handleMoreReviews = () => {
    if ((reviewCount - renderCount) >= 2) {
      setRenderCount(renderCount + 2);
    } else if ((reviewCount - renderCount) >= 0 ) {
      setRenderCount(reviewCount);
    } else {
      setRenderCount(renderCount);
    }
  };

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