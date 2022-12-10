import React, { useState, useEffect } from 'react';
import Stars from './Stars.jsx';
import BarGraph from './BarGraph.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import styled from 'styled-components';

const Ratings = ({handleBarFilter, renderList, avgRating, recommendPercentage, ratings, percentages, characteristics}) => {

    const RatingsContainer = styled.div`
      position: relative;
  `;

  const AvgRatingContainer = styled.span`
    font-weight: bold;
    margin: 10px 5px;
    font-size: 48px;
  `;

  return (
    <RatingsContainer>
      <h2 style={{padding: "0px", margin: "100px, 0px, 0px, 0px"}}>Ratings & Reviews</h2>
      <AvgRatingContainer>{avgRating}</AvgRatingContainer>
      <Stars number={avgRating}/>
      <h4 style={{padding: "0px", margin: "5px"}}>Rating Breakdown</h4>
      <div>{recommendPercentage + "% of reviews recommend this product"}</div>
      <BarGraph ratings={ratings} percentages={percentages} handleBarFilter={handleBarFilter} renderList={renderList}/>
      <div>
        {Object.keys(characteristics).map((key) => <ProductBreakdown key={key} characteristic={characteristics[key]} category={key} /> )}
      </div>
    </RatingsContainer>
  )
}

export default Ratings;