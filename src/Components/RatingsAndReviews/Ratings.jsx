import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stars from './Stars.jsx';
import BarGraph from './BarGraph.jsx'

const Ratings = ({productID}) => {
  const [reviewMeta, setReviewMeta] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [recommendPercentage, setRecommendedPercentage] = useState(0);
  const [ratings, setRatings] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:3000/reviews/meta?product_id=${productID}`, {header: {'Access-Control-Allow-Origin': '*'}})
      .then((data) => {
        console.log(data.data); //data.data.count has how many reviews
        setReviewMeta(data.data);
        setRatings(data.data.ratings);
        setAvgRating(calculateAvgRating(data.data.ratings));
        setRecommendedPercentage(calculateRecommendedPercentage(data.data.recommended));
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

  return (
    <div>
      <div>Some Ratings</div>
      <div>{avgRating}</div>
      <Stars number={avgRating}/>
      <div>{recommendPercentage + "% of reviews recommend this product"}</div>
      <BarGraph />
    </div>
  )
}

export default Ratings;