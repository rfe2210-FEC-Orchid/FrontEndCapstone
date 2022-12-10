import React, { useState, useEffect } from 'react';
import styled from 'styled-components';



const ProductBreakdown = ({characteristic, category}) => {

  // if(category === "Fit") {

  // }
  const Container = styled.div`
    position: relative;
    width: 175px;
  `;

  const ScaleBar = styled.div`
    display: inline-flex;
    /* position: relative; */
    background-color: grey;
    height: 10px;
    width: 30px;
    margin: 0 2px;
  `;

  const Pointer = styled.div`
    overflow: hidden;
    position: absolute;
    width: 0;
    height: 0;
    left: 2px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid black;
  `;

  const LowText = styled.span`
  `;

  const HighText = styled.span`
    position: absolute;
    right: 0px;
  `;

  return (
   <Container>
    <div>{category}</div>
    <Pointer style={{left: (2 + Math.round(characteristic.value * 158 / 5)) + "px"}}/>
    {[...new Array(5)].map(() => <ScaleBar></ScaleBar>)}
    {/* <span>{Math.round(characteristic.value * 100) / 100}</span><br/> */}
    <LowText>Poor</LowText>
    <HighText>Great</HighText>
   </Container>
  )
}

export default ProductBreakdown;