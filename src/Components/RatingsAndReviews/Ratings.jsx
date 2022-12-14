import React from 'react';
import Stars from './Stars.jsx';
import BarGraph from './BarGraph.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import styled from 'styled-components';

  const RatingsContainer = styled.div`
    position: relative;
  `;

  const AvgRatingContainer = styled.span`
    font-weight: bold;
    margin: 10px 5px;
    font-size: 48px;
  `;

  const PercentageRecommended = styled.div`
    margin: 10px 0px;
  `;

const Ratings = ({handleBarFilter, renderList, avgRating, recommendPercentage, ratings, percentages, characteristics}) => {

  return (
    <RatingsContainer>
      <AvgRatingContainer data-name="avgRating">{avgRating}</AvgRatingContainer>
      <Stars data-name="stars" number={avgRating}/>
      <h4 style={{padding: "0px", margin: "5px"}}>Rating Breakdown</h4>
      <PercentageRecommended>{recommendPercentage + "% of reviews recommend this product"}</PercentageRecommended>
      <BarGraph ratings={ratings} percentages={percentages} handleBarFilter={handleBarFilter} renderList={renderList}/>
      <div className="pdbreakdown-container">
        {Object.keys(characteristics).map((key) => <ProductBreakdown key={key} characteristic={characteristics[key]} category={key} /> )}
      </div>
    </RatingsContainer>
  )
}

export default Ratings;