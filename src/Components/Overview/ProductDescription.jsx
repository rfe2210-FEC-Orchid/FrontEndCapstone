import React from 'react';
import styled from 'styled-components';

const DescriptionContainer = styled.div`
  position: relative;
  margin: 20px 10%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const LeftColumn = styled.div`
  // display: inline-block;
  margin: 0 10px;
  padding: 0 30px;
  width: 65%;
  height: 100%;
  border-right: 2px solid black;
`;

const RightColumn = styled.div`
  margin: 0 10px;
  padding: 0 30px;
  width: 35%;
  height: 100%;
`;

const ProductDescription = (props) => {

  return (
    <DescriptionContainer>
      <LeftColumn>
        <h3>{props.slogan}</h3>
        <p>{props.description}</p>
      </LeftColumn>
      <RightColumn>
        <h3>Features:</h3>
        {props.features && props.features.filter(feature => feature.value).map((feature, index) =>
          <p key={index}>{feature.feature}: {feature.value}</p>
        )}
      </RightColumn>
    </DescriptionContainer>
  );
};

export default ProductDescription;