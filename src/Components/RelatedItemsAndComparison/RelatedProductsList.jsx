import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProductCards from './RelatedProductCards.jsx';

// displays products which have been associated with the current product
// map through the array of related product IDs to create card
// how do you initially get the related product IDs?
//
const RelatedProductsList = ({setproductID, GetRelatedProductsList, relatedProducts}) => {
  return (
    <div>
      <h3>RELATED PRODUCTS</h3>
    </div>
  )
}

export default RelatedProductsList;

// {relatedProducts.map((id) => {return <RelatedProductCards key={id} productID={id} setproductID={setproductID} GetRelatedProductsList={GetRelatedProductsList} />})}