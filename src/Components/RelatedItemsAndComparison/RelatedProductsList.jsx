import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProductCards from './RelatedProductCards.jsx';

const RelatedProductsList = ({relatedProducts,  setproductId}) => {
  return(
    <div id='product-list'>
      {relatedProducts.map((product) => {
        return (
        <RelatedProductCards key={product.id} product={product} setproductId={setproductId} />
        )
      })}
    </div>
  )
}
export default RelatedProductsList;