import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stars from './Stars.jsx';
import BarGraph from './BarGraph.jsx'

const Ratings = ({productID, handleBarFilter, renderList}) => {
  const [reviewMeta, setReviewMeta] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [recommendPercentage, setRecommendedPercentage] = useState(0);
  const [ratings, setRatings] = useState({});
  const [percentages, setPercentages] = useState({5: 0, 4: 0, 3: 0, 2: 0, 1:0})

  useEffect(()=>{
    axios.get(`http://localhost:3000/reviews/meta?product_id=${productID}`, {header: {'Access-Control-Allow-Origin': '*'}})
      .then((data) => {
        console.log(data.data); //data.data.count has how many reviews
        setReviewMeta(data.data);
        setRatings(data.data.ratings);
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

  return (
    <div>
      <div>Some Ratings</div>
      <div>{avgRating}</div>
      <Stars number={avgRating}/>
      <div>{recommendPercentage + "% of reviews recommend this product"}</div>
      <BarGraph ratings={ratings} percentages={percentages} handleBarFilter={handleBarFilter} renderList={renderList}/>
    </div>
  )
}

export default Ratings;