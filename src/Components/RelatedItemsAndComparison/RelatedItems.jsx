import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';

const RelatedItems = ({productId, setproductId, productInfo, setproductInfo}) => {
  const [relatedProducts, setrelatedProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    GetRelatedProductsList();
    GetCart();
  }, [])

  let GetRelatedProductsList = () => {
    axios.get(`http://localhost:3001/products/${productId}/related`)
    .then((res) => {
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
            let product = {id: res.data.id, category: res.data.category, name: res.data.name, price: res.data.default_price, image: result.data.results[0].photos};
            return product;
          })
          .catch((err) => {
            console.log('failed to retrieve product style', err);
          })
          // return res.data;
        })
        .catch((err) => {
          console.log('failed to retrieve related product info: ', err);
        })
      })
      Promise.all(relatedProductsInfo)
      .then((result) => {
        console.log('array of related products info: ', result);
        setrelatedProducts(result);
      })
      .catch((err) => {
        console.log('failed to get an array of related products info: ', err);
      })
    }

  let GetCart = () => {
    axios.get('http://localhost:3001/cart')
    .then((res) => {
      console.log('cart: ', res.data); // res.data = [{sku_id, count}]
      GetCartInfo(res.data);
    })
    .catch((err) => {
      console.log('failed to retrieve cart: ', err);
    })
  }
  // get product info based on sku_id - product info needs product id
  // match sku_id to a product id
  // get product info based on product id
  // get style info based on product id
  let GetCartInfo = (req) => {
    let cartInfo = req.map((id) => {
      let skuId = id.sku_id;
      if (skuId)
      return axios.get(`http://localhost:3001/products/${id}`)
        .then((res) => {
          return axios.get(`http://localhost:3001/products/${id}/styles`)
          .then((result) => {
            let product = {id: res.data.id, category: res.data.category, name: res.data.name, price: res.data.default_price, image: result.data.results[0].photos};
            return product;
          })
          .catch((err) => {
            console.log('failed to retrieve product style', err);
          })
          // return res.data;
        })
        .catch((err) => {
          console.log('failed to retrieve product info: ', err);
        })
      })
      Promise.all(cartInfo)
      .then((result) => {
        console.log('array of outfit info: ', result);
        setCart(result);
      })
      .catch((err) => {
        console.log('failed to get an array of outfit info: ', err);
      })
  }

  return (
    <div>
      <RelatedProductsList relatedProducts={relatedProducts} setproductId={setproductId} />
      <OutfitList cart={cart} setproductId={setproductId} />
    </div>
  )
}

export default RelatedItems;