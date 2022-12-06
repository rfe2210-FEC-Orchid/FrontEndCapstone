import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import Ratings from './Ratings.jsx';

const RnR = () => {
  const [productID, setProductID] = useState("37311");
  const [reviewLibrary, setReviewLibrary] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [renderCount, setRenderCount] = useState(2);
  const [renderList, setRenderList] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:3000/reviews?product_id=${productID}`, {header: {'Access-Control-Allow-Origin': '*'}})
      .then((data) => {
        console.log(data.data); //data.data.count has how many reviews
        setReviewLibrary(data.data.results);
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

  useEffect(()=>{
    console.log(renderList.length === 0);
    if (renderList.length === 0) {
      setReviews(reviewLibrary);
      setReviewCount(reviewLibrary.length);
      console.log(renderCount);
      // if (reviewLibrary.length < 2) {
      //   setRenderCount(reviewLibrary.length);
      // }
    } else {
      let videoList = reviewLibrary.filter((review) => {return (renderList.indexOf(review.rating) > -1)});
      setReviews(videoList);
      setReviewCount(videoList.length);
    }
  },[renderList, reviewLibrary]);

  const handleMoreReviews = () => {
    if ((reviewCount - renderCount) >= 2) {
      setRenderCount(renderCount + 2);
    } else if ((reviewCount - renderCount) >= 0 ) {
      setRenderCount(reviewCount);
    } else {
      setRenderCount(renderCount);
    }
  };

  const handleBarFilter = (number) => {
    if (renderList.indexOf(number) === -1) {
      setRenderList([...renderList, number])
    } else {
      setRenderList(renderList.filter((num) => {return num !== number}))
    }
  }

  return (
    <div>
      <div>I MADE A CHANGE 🤪🤪🤪🤪</div>
      <div>{"I'm here!!! " + renderList}</div>
      <Ratings productID={productID} handleBarFilter={handleBarFilter} renderList={renderList}/>
      <ReviewsList productID={productID} reviews={reviews} reviewCount={reviewCount} renderCount={renderCount} handleMoreReviews={handleMoreReviews}/>
    </div>
  )
}

export default RnR;