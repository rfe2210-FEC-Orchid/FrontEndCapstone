import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDescription = (props) => {

  return (
    <div>
      Product Description
      <div>
        <h3>{props.slogan}</h3>
        <p>{props.description}</p>
      </div>
      <ul>
        {props.features && props.features.map((feature, index) =>
          <li key={index}>{feature.feature}: {feature.value}</li>
        )}
      </ul>
    </div>
  );
};

export default ProductDescription;