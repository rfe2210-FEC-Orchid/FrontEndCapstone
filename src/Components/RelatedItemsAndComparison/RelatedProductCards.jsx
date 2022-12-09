import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RelatedProductCards = ({product, setproductId}) => {
  let refreshOverview = () => {
    console.log('I got clicked, and I should be refreshing the page')
    setproductId(product.id);
  }

  return (
    <div className='card'>
      <div onClick={refreshOverview}>
        {product.image ? (
          <img src={product.image[0].url} alt={product.name} width='230' height='230' className='image'/>
          ) : 'image not available'
        }
       <div className='card-details'>
         <button>Comparison</button>
         <h4>{product.category}</h4>
         <h4>{product.name}</h4>
         <h5>${product.price}</h5>
         <p>★★★★★</p>
       </div>
      </div>
    </div>
  )
}

export default RelatedProductCards;