import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaPlusCircle} from 'react-icons/fa';
import postCart from './Helpers.jsx';
import OutfitCards from './OutfitCards.jsx';

const OutfitList = ({cart}) => {
  return (
    <div id='product-list'>
      <div className='card details' id='first-outfit-card'>
        <div id='add-outfit'>
          <h2>Add to Outfit</h2>
          <FaPlusCircle size={75} onClick={postCart}/>
        </div>
      </div>
      {cart.map((product) => {
        return (
          <OutfitCards key={product.id} product={product} />
        )
      })}
    </div>
  )
}

export default OutfitList;