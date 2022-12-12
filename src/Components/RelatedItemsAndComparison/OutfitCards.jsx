import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaRegTrashAlt} from 'react-icons/fa';

const OutfitCards = ({product, setproductId, deleteOutfit}) => {
  let removeOutfit = () => {
    deleteOutfit(product.id);
  }
  return (
    <div className='card'>
      <div>
        <div className='image-and-modal'>
            <FaRegTrashAlt size={20} className='delete-icon' onClick={removeOutfit}/>
        {product.image ? (
          <img src={product.image[0].url} alt={product.name} width='230' height='230' id='image'/>
        ) : 'image not available'
        }
        </div>
        <div className='card-details'>
          <h4>{product.category}</h4>
          <h4>{product.name}</h4>
          <h5>${product.price}</h5>
          <p>★★★★★</p>
        </div>
      </div>
    </div>
  )
}

export default OutfitCards;