// MAIN APP
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OutfitList from './OutfitList.jsx';
import RelatedProductsList from './RelatedProductsList.jsx';

const RelatedItems = ({productId, setproductId, productInfo, setproductInfo}) => {
  const [relatedProducts, setrelatedProducts] = useState([]);

  useEffect(() => {
    GetRelatedProductsList();
    // GetCart();
  }, [])

  let GetRelatedProductsList = () => {
    axios.get(`http://localhost:3001/products/${productId}/related`)
    .then((res) => {
      console.log('related product IDs: ', res.data);
      let relatedProductsInfo = res.data.map((id) => {
        return axios.get(`http://localhost:3001/products/${id}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log('failed to retrieve related product info: ', err);
        })
      })
      // console.log(Promise.all(relatedProductsInfo));
      // return Promise.all(relatedProductsInfo);
      Promise.all(relatedProductsInfo)
      .then((result) => {
        setrelatedProducts(result);
      })
    })
    .catch((err) => {
      console.log('failed to retrieve related product IDs info: ', err);
    })
  }

  // console.log('final related products info: ', relatedProductsInfo);
  // return Promise.all(relatedProductsInfo);
  // let GetCart = () => {
  //   axios.get('/cart')
  //   .then((res) => {
  //     console.log('products added to the cart: ', res);
  //   })
  //   .catch((err) => {
  //     console.log('failed to retrieve cart: ', err);
  //   })
  // }
  return (
    <div>
      <RelatedProductsList relatedProducts={relatedProducts} setproductId={setproductId}/>
      {/* <OutfitList GetCart={GetCart}/> */}
    </div>
  )
}

export default RelatedItems;