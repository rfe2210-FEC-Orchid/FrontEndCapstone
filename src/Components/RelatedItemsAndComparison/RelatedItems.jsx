// MAIN APP
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OutfitList from './OutfitList.jsx';
import RelatedProductsList from './RelatedProductsList.jsx';

// GET /products/:product_id/related
  // send a required product id for GET req
  // returns a list of product ids related to the product specified
  // create a state for product ID

const RelatedItems = ({productId, productInfo}) => {
  const [relatedProducts, setrelatedProducts] = useState([]);

  useEffect(() => {
    GetRelatedProductsList();
    GetCart();
  }, [])

  let GetRelatedProductsList = () => {
    axios.get('/products/:product_id/related', {
      params: {
        product_id: productId
      }
    })
    .then((res) => {
      console.log('related product IDs: ', res);
      // pass result to <RelatedProductsList /> so it can map through the array
      setrelatedProducts(res.data);
    })
    .catch((err) => {
      console.log('failed to retrieve related product IDs: ', err);
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
      <RelatedProductsList relatedProducts={relatedProducts}GetRelatedProductsList={GetRelatedProductsList} productInfo={productInfo}/>
      <OutfitList GetCart={GetCart}/>
    </div>
  )
}

export default RelatedItems;