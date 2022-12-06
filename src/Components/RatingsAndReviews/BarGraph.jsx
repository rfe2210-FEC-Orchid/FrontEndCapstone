import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BarGraph = () => {

  const BackgroundBar = styled.div`
    display: inline-flex;
    position: relative;
    background-color: grey;
    height: 10px;
    width: 50px;
    margin: 0px 0px 0px 5px;
  `;

  // const BackgroundBar = styled.div`
  //   background-color: grey;
  //   height: 10px;
  //   width: 50px;
  // `;
  const Bar = styled.div`
    background-color: black;
    height: 10px;
    width: 20%;
    overflow: hidden;
    position: absolute;
  `;

  return (
    <div>
      <span>5 star</span>
      <BackgroundBar>
        <Bar></Bar>
       </BackgroundBar>
    </div>

  )
}

export default BarGraph;