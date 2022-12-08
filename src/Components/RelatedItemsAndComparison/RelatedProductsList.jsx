import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProductCards from './RelatedProductCards.jsx';

const RelatedProductsList = ({relatedProducts, setproductId}) => {
  console.log('related products info array', relatedProducts);
  // return (
  //   <div>
  //     <h3>RELATED PRODUCTS</h3>
  //     {relatedProducts.map((product) => {return <RelatedProductCards key={product.id} product={product} setproductId={setproductId} />})}
  //   </div>
  // )
}

export default RelatedProductsList;

// {relatedProducts.map((id) => {return <RelatedProductCards key={id} productID={id} setproductID={setproductID} GetRelatedProductsList={GetRelatedProductsList} />})}