import React, { useState, useEffect } from 'react';

const ProductInfo = (props) => {

  return (
    <div>
      Product Info
      <p>{props.category}</p>
      <h2>{props.name}</h2>
    </div>
  );
};

export default ProductInfo;