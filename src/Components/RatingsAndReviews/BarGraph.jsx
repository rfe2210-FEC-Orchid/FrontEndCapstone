import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BarGraph = ({ratings, percentages, handleBarFilter, renderList}) => {

  const BackgroundBar = styled.div`
    display: inline-flex;
    position: relative;
    background-color: grey;
    height: 10px;
    width: 50px;
    margin: 0px 5px;
  `;

  // const BackgroundBar = styled.div`
  //   background-color: grey;
  //   height: 10px;
  //   width: 50px;
  // `;
  const Bar = styled.div`
    background-color: black;
    height: 10px;
    width: 0%;
    overflow: hidden;
    position: absolute;
  `;

  const BarContainer = styled.div`
    cursor: pointer;
    width: 180px;
    &:hover {
      border-bottom: 1px solid black;
    }
  `;

  return (
    <div>
      <BarContainer onClick={(evt) => {
        evt.preventDefault();
        handleBarFilter(5);
      }} style={{backgroundColor: renderList.indexOf(5) > -1 ? "#90EE90" : null}}>
        <span>5 Star</span>
        <BackgroundBar><Bar style={{width: percentages[5]}}></Bar></BackgroundBar>
        <span>{ratings[5] + " reviews"}</span>
      </BarContainer>
      <BarContainer onClick={(evt) => {
        evt.preventDefault();
        handleBarFilter(4);
      }} style={{backgroundColor: renderList.indexOf(4) > -1 ? "#90EE90" : null}}>
        <span>4 star</span>
        <BackgroundBar><Bar style={{width: percentages[4]}}></Bar></BackgroundBar>
        <span>{ratings[4] + " reviews"}</span>
      </BarContainer>
      <BarContainer onClick={(evt) => {
        evt.preventDefault();
        handleBarFilter(3);
      }} style={{backgroundColor: renderList.indexOf(3) > -1 ? "#90EE90" : null}}>
        <span>3 star</span>
        <BackgroundBar><Bar style={{width: percentages[3]}}></Bar></BackgroundBar>
        <span>{ratings[3] + " reviews"}</span>
      </BarContainer>
      <BarContainer onClick={(evt) => {
        evt.preventDefault();
        handleBarFilter(2);
      }} style={{backgroundColor: renderList.indexOf(2) > -1 ? "#90EE90" : null}}>
        <span>2 star</span>
        <BackgroundBar><Bar style={{width: percentages[2]}}></Bar></BackgroundBar>
        <span>{ratings[2] + " reviews"}</span>
      </BarContainer>
      <BarContainer onClick={(evt) => {
        evt.preventDefault();
        handleBarFilter(1);
      }} style={{backgroundColor: renderList.indexOf(1) > -1 ? "#90EE90" : null}}>
        <span>1 star</span>
        <BackgroundBar><Bar style={{width: percentages[1]}}></Bar></BackgroundBar>
        <span>{ratings[1] + " reviews"}</span>
      </BarContainer>
    </div>

  )
}

export default BarGraph;