// MAIN APP
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OutfitList from './OutfitList.jsx';
import RelatedProductsList from './RelatedProductsList.jsx';

// GET /products/:product_id/related
  // send a required product id for GET req
  // returns a list of product ids related to the product specified
  // create a state for product ID

const RelatedItems = () => {
  const [productID, setproductID] = useState(37312); // Ben uses this as well

  useEffect(() => {
    GetRelatedProductsList();
    GetCart();
  }, [])

  let GetRelatedProductsList = () => {
    axios.get('/products/:product_id/related', {
      params: {
        product_id: productID
      }
    })
    .then((res) => {
      console.log('related product IDs: ', res);
      // pass result to <RelatedProductsList /> so it can map through the array
    })
    .catch((err) => {
      console.log('failed to receive related product IDs: ', err);
    })
  }

  let GetCart = () => {
    axios.get('/cart')
    .then((res) => {
      console.log('products added to the cart: ', res);
    })
    .catch((err) => {
      console.log('failed to retrieve cart: ', err);
    })
  }

  return (
    <div>
      <RelatedProductsList setproductID={setproductID} GetRelatedProductsList={GetRelatedProductsList}/>
      <OutfitList GetCart={GetCart}/>
    </div>
  )
}

export default RelatedItems;