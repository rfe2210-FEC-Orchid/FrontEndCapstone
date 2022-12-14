import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';

const RelatedItems = ({productId, setproductId, productInfo, selectedStyle}) => {
  const [relatedProducts, setrelatedProducts] = useState([]);

  useEffect(() => {
    GetRelatedProductsList();
  }, [productId])

  let GetRelatedProductsList = () => {
    axios.get(`http://localhost:3001/products/${productId}/related`)
    .then((res) => {
      // console.log('related products: ', res.data);
      GetRelatedProductsInfo(res.data);
    }
    )
    .catch((err) => {
      console.log('failed to retrieve list of related product IDs: ', err);
    })
  }

  let GetRelatedProductsInfo = (req) => {
      let relatedProductsInfo = req.map((id) => {
        return axios.get(`http://localhost:3001/products/${id}`)
        .then((res) => {
          return axios.get(`http://localhost:3001/products/${id}/styles`)
          .then((result) => {
            let product = {id: res.data.id, category: res.data.category, name: res.data.name, price: res.data.default_price, saleprice: result.data.results[0].sales_price, image: result.data.results[0].photos, features: res.data.features};
            return product;
          })
          .catch((err) => {
            console.log('failed to retrieve product style', err);
          })
        })
        .catch((err) => {
          console.log('failed to retrieve related product info: ', err);
        })
      })
      Promise.all(relatedProductsInfo)
      .then((result) => {
        // console.log('array of related products info: ', result);
        setrelatedProducts(result);
      })
      .catch((err) => {
        console.log('failed to get an array of related products info: ', err);
      })
    }

  return (
    <div id='related-items'>
      <RelatedProductsList relatedProducts={relatedProducts} setproductId={setproductId} currentProductInfo={productInfo} />
      <OutfitList setproductId={setproductId} currentProductInfo={productInfo} selectedStyle={selectedStyle}/>
    </div>
  )
}

export default RelatedItems;