import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import Ratings from './Ratings.jsx';
import styled from 'styled-components';
import WriteAReview from './WriteAReview.jsx';

const RnR = ({productID}) => {
  // const [productID, setProductID] = useState(37311);
  const [reviewLibrary, setReviewLibrary] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [renderCount, setRenderCount] = useState(2);
  const [renderList, setRenderList] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [recommendPercentage, setRecommendedPercentage] = useState(0);
  const [ratings, setRatings] = useState({});
  const [percentages, setPercentages] = useState({5: 0, 4: 0, 3: 0, 2: 0, 1:0})
  const [characteristics, setCharacteristics] = useState("");
  const [sortBy, setSortBy] = useState(sortBy || "relevant");
  const [isWritingReview, setIsWritingReview] = useState(false); //for Modal

  useEffect(()=>{
    axios.get(`http://localhost:3001/reviews?product_id=${productID}&count=2000&sort=${sortBy}`)
      .then((data) => {
        console.log(data.data); //data.data.count has how many reviews
        setReviewLibrary(data.data.results);
        setReviews(data.data.results);
        setReviewCount(data.data.results.length);
        if (data.data.results.length < 2) {
          setRenderCount(data.data.results.length);
        }
      })
      .catch((err) => {
        console.error(err);
      })
  },[sortBy, renderCount]);


  useEffect(()=>{
    console.log(renderList.length === 0);
    handleRenderList();
  },[renderList]);

  const handleRenderList = () => {
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
  }

  const handleMoreReviews = () => {
    if ((reviewCount - renderCount) >= 2) {
      setRenderCount(currCount => {
        return currCount + 2;
      });
    } else if ((reviewCount - renderCount) >= 0 ) {
      setRenderCount(reviewCount);
    } else {
      setRenderCount(renderCount);
    }
  };

  const handleBarFilter = (number) => {
    if (typeof number !== "number") { //if not number, just reset
      setRenderList(number)
    } else {
      if (renderList.indexOf(number) === -1) {
        setRenderList([...renderList, number])
      } else {
        setRenderList(renderList.filter((num) => {return num !== number}))
      }
    }
  }

  //for ratings

  const handleSortBy = (string) => {
     setSortBy(string);
    //  setRenderList([]);
  };

  //for reviews.meta
  useEffect(()=>{
    axios.get(`http://localhost:3001/reviews/meta?product_id=${productID}`)
      .then((data) => {
        console.log(data.data); //data.data.count has how many reviews
        setRatings(data.data.ratings);
        setCharacteristics(data.data.characteristics);
        setAvgRating(calculateAvgRating(data.data.ratings));
        setRecommendedPercentage(calculateRecommendedPercentage(data.data.recommended));
        calculatePercentage(data.data.ratings);
      })
      .catch((err) => {
        console.error(err);
      })
  },[]);

  function calculateAvgRating (obj) {
    var sum = (obj[1] * 1) + (obj[2] * 2) + (obj[3] * 3) + (obj[4] * 4) + (obj[5] * 5);
    var count = Number(obj[1]) + Number(obj[2]) + Number(obj[3]) + Number(obj[4]) + Number(obj[5]);
    var result = Math.round((sum / count) * 10) / 10  ;
    return result;
  }

  function calculateRecommendedPercentage (obj) {
    return Math.round(Number(obj.true)/(Number(obj.true) + Number(obj.false)) * 100);
  }

  function calculatePercentage (obj) {
    var sum = Number(obj[5]) + Number(obj[4]) + Number(obj[3]) + Number(obj[2]) + Number(obj[1]);
    setPercentages({
      5: Math.round((Number(obj[5])/sum) * 100) + "%",
      4: Math.round((Number(obj[4])/sum) * 100) + "%",
      3: Math.round((Number(obj[3])/sum) * 100) + "%",
      2: Math.round((Number(obj[2])/sum) * 100) + "%",
      1: Math.round((Number(obj[1])/sum) * 100) + "%"
    })
  }

  const RnRContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    justify-content: center;
  `;


  return (
    <RnRContainer>
      <Ratings handleBarFilter={handleBarFilter} renderList={renderList} avgRating={avgRating} recommendPercentage={recommendPercentage} ratings={ratings} percentages={percentages} characteristics={characteristics}/>
      <ReviewsList reviews={reviews} reviewCount={reviewCount} renderCount={renderCount} handleMoreReviews={handleMoreReviews} renderList={renderList} handleBarFilter={handleBarFilter} handleSortBy={handleSortBy} sortBy={sortBy} setIsWritingReview={setIsWritingReview}/>
      <WriteAReview isWritingReview={isWritingReview} onClose={() => setIsWritingReview(false)} characteristics={characteristics} productID={productID}/>
    </RnRContainer>
  )
}

export default RnR;