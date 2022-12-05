import React from 'react';

const ProductDescription = (props) => {

  return (
    <div>
      <div>
        <h3>{props.slogan}</h3>
        <p>{props.description}</p>
      </div>
      <ul>
        {props.features && props.features.filter(feature => feature.value).map((feature, index) =>
          <li key={index}>{feature.feature}: {feature.value}</li>
        )}
      </ul>
    </div>
  );
};

export default ProductDescription;