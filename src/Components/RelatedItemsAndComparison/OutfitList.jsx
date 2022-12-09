import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft, FaPlusCircle} from 'react-icons/fa';
import './RelatedItems.css';
import postCart from './Helpers.jsx';
import OutfitCards from './OutfitCards.jsx';

// product can only be added to an outfit once when clicked on "add to outfit"

const OutfitList = ({cart, setproductId}) => {
  const slideLeft = () => {
    const slider = document.getElementById('outfit-list-slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  }
  const slideRight = () => {
    const slider = document.getElementById('outfit-list-slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  return (
    <div>
      <div className='outfit-list'>
        <h3>YOUR OUTFIT</h3>
        <div className='carousel-container'>
          <FaArrowAltCircleLeft size={40} className='left-arrow' onClick={slideLeft}/>
           <div id='outfit-list-slider'>
             <div id='add-outfit'>
               <h2>Add to Outfit</h2>
               <FaPlusCircle size={75} onClick={postCart}/>
             </div>
             {cart.map((product) => {
               return ( <OutfitCards key={product.id} product={product} setproductId={setproductId} /> )
             })}
           </div>
          <FaArrowAltCircleRight size={40} className='right-arrow' onClick={slideRight}/>
        </div>
      </div>
    </div>
  )
}

export default OutfitList;