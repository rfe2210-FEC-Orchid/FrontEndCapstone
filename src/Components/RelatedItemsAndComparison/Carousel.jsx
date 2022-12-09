import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';
import './RelatedItems.css';
import  RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';

const Carousel = ({relatedProducts,  setproductId, cart}) => {

  const slideLeft = () => {
    const carousel = document.getElementById('carousel');
    carousel.scrollLeft = carousel.scrollLeft - 500;
  }
  const slideRight = () => {
    const carousel = document.getElementById('carousel');
    carousel.scrollLeft = carousel.scrollLeft + 500;
  }

  return(
    <div>
      <div className='related-product-list'>
        <h3>RELATED PRODUCTS</h3>
        <div className='carousel-container'>
          <FaArrowAltCircleLeft size={40} className='left-arrow' onClick={slideLeft}/>
          <div id='carousel'>
            <RelatedProductsList relatedProducts={relatedProducts} setproductId={setproductId}/>
          </div>
          <FaArrowAltCircleRight size={40} className='right-arrow' onClick={slideRight}/>
        </div>
      </div>
      <div className='outfit-list'>
        <h3>YOUR OUTFIT</h3>
        <div className='carousel-container'>
          <FaArrowAltCircleLeft size={40} className='left-arrow' onClick={slideLeft}/>
           <div id='carousel'>
            <OutfitList cart={cart}/>
          </div>
          <FaArrowAltCircleRight size={40} className='right-arrow' onClick={slideRight}/>
        </div>
      </div>
    </div>
  )
}
export default Carousel;