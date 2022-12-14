import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import Ratings from './Ratings.jsx';
import styled from 'styled-components';
import WriteAReview from './WriteAReview.jsx';
import {UserContext} from '../UserContext.jsx';

  const RnRContainer = styled.div`
  /* left: 20px; */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  position: relative;
  /* position: relative;
  display: grid;
  grid-template-columns: 2fr 5fr;
  grid-template-areas: "header header"; */
  `;

  const RatingsContainer = styled.div`
  `;

  const ReviewsContainer = styled.div`
    width: 55%;
    margin: 0 0 0 35px;
  `;


const RnR = ({productID, productName, handleTrack}) => {
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
  const [searchReviews, setSearchReviews] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isWritingReview, setIsWritingReview] = useState(false); //for Modal
  const {trackData}= useContext(UserContext); //usertracking

  useEffect(()=>{
    axios.get(`http://localhost:3001/reviews?product_id=${productID}&count=2000&sort=${sortBy}`)
      .then((data) => {
          // console.log(data.data); //data.data.count has how many reviews
          setReviewLibrary(data.data.results);
          handleRenderList(data.data.results);
          if (data.data.results.length < 2) {
            setRenderCount(data.data.results.length);
          }
          // return new Promise((resolve) => {resolve(data.data.results)})
      })
      // .then((data) => {
      //   console.log("I'm in the promise");
      //   handleRenderList(data);
      //   // handleRenderList();
      // })
      .catch((err) => {
        console.error(err);
      })
  },[sortBy, productID]);


  useEffect(()=>{
    handleRenderList();
  },[renderList]);

  const handleRenderList = (data) => {
    const library = data || reviewLibrary;
    if (renderList.length === 0) {
      setSearchReviews(library);
      let videoList = library
        .filter((review) => {
        return (review.body.toLowerCase().indexOf(searchInput) > -1) || (review.summary.toLowerCase().indexOf(searchInput) > -1)})
      setReviews(videoList);
      setReviewCount(videoList.length);
      // console.log(renderCount);
      // if (library.length < 2) {
      //   setRenderCount(library.length);
      // }
    } else {
      let videoList = library
        .filter((review) => {return (renderList.indexOf(review.rating) > -1)})
        .filter((review) => {
          return (review.body.toLowerCase().indexOf(searchInput) > -1) || (review.summary.toLowerCase().indexOf(searchInput) > -1)})
      setReviews(videoList);
      setReviewCount(videoList.length);
      setSearchReviews(videoList);
    }
  }

  const handleMoreReviews = (evt) => {
    handleTrack(evt, "reviewNratings");
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
        // console.log(data.data); //data.data.count has how many reviews
        setRatings(data.data.ratings);
        setCharacteristics(data.data.characteristics);
        setAvgRating(calculateAvgRating(data.data.ratings));
        setRecommendedPercentage(calculateRecommendedPercentage(data.data.recommended));
        calculatePercentage(data.data.ratings);
      })
      .catch((err) => {
        console.error(err);
      })
  },[productID]);

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

  const handleSearch = (term) => {
    setSearchInput(term);
    let word = term.toLowerCase();
    let searchRender = searchReviews.filter((review) => {
      return (review.body.toLowerCase().indexOf(word) > -1) || (review.summary.toLowerCase().indexOf(word) > -1)});
    let searchReturn = word.length < 3 ? searchReviews : searchRender;
    setReviews(searchReturn);
    setReviewCount(searchReturn.length);
  };

  return (
    <div>
      <RnRContainer id="RnR">
        <h2 style={{width: "100%", textAlign: "center"}}>RATINGS & REVIEWS</h2>
        <RatingsContainer>
          <Ratings handleBarFilter={handleBarFilter} renderList={renderList} avgRating={avgRating} recommendPercentage={recommendPercentage} ratings={ratings} percentages={percentages} characteristics={characteristics}/>
        </RatingsContainer>
        <ReviewsContainer>
          <ReviewsList reviews={reviews} reviewCount={reviewCount} renderCount={renderCount} handleMoreReviews={handleMoreReviews} renderList={renderList} handleBarFilter={handleBarFilter} handleSortBy={handleSortBy} sortBy={sortBy} setIsWritingReview={setIsWritingReview} searchInput={searchInput} handleSearch={handleSearch} handleTrack={handleTrack}/>
        </ReviewsContainer>
        <WriteAReview isWritingReview={isWritingReview} onClose={() => setIsWritingReview(false)} characteristics={characteristics} productID={productID} productName={productName}/>
        {trackData.map((data) => <div>{data}</div>)}
        <div>{"search Reviews: " + searchReviews.length}</div>
        <div>{"reviews: " + reviews.length}</div>
        <div>{"library: " + reviewLibrary.length}</div>
      </RnRContainer>
    </div>

  )
}

export default RnR;