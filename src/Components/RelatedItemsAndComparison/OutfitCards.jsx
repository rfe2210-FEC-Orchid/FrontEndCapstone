import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OutfitCards = ({product}) => {
  // get product info with the given sku_id
  return (
    <div className='card'>
      {product.image ? (
        <img src={product.image[0].url} alt={product.name} width='230' height='230' id='image'/>
      ) : 'image not available'
      }
      <div className='card-details'>
        <h4>{product.category}</h4>
        <h4>{product.name}</h4>
        <h5>${product.price}</h5>
        <p>★★★★★</p>
      </div>
    </div>
  )
}

export default OutfitCards;