import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaAngleRight, FaAngleLeft} from 'react-icons/fa';
import './RelatedItems.css';
import OutfitList from './OutfitList.jsx';
import RelatedProductCards from './RelatedProductCards.jsx';

const RelatedProductsList = ({relatedProducts,  setproductId, currentProductInfo}) => {
  const slideLeft = () => {
    const slider = document.getElementById('related-products-slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  }
  const slideRight = () => {
    const slider = document.getElementById('related-products-slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  return(
    <div>
      <div className='related-product-list'>
        <h2>RELATED PRODUCTS</h2>
        <div className='carousel-container'>
          <FaAngleLeft size={40} className='left-arrow' onClick={slideLeft}/>
          <div id='related-products-slider'>
            {relatedProducts.map((product) => {
              return ( <RelatedProductCards key={product.id} product={product} setproductId={setproductId} currentProductInfo={currentProductInfo}/>)
            })}
          </div>
          <FaAngleRight size={40} className='right-arrow' onClick={slideRight}/>
        </div>
      </div>
    </div>
  )
}
export default RelatedProductsList;