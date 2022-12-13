import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaRegTrashAlt} from 'react-icons/fa';
import Rating from './Rating.jsx';

const OutfitCards = ({product, setproductId, deleteOutfit}) => {
  let removeOutfit = () => {
    deleteOutfit(product.id);
  }
  let refreshOverview = () => {
    console.log('I got clicked, and I should be refreshing the page:')
    setproductId(product.id);
  }

  return (
    <div className='card'>
      <div>
        <div className='image-and-modal'>
            <FaRegTrashAlt size={20} className='delete-icon' onClick={removeOutfit}/>
        {product.image[0].url ? (
          <img src={product.image[0].url} alt={product.name} width='230' height='230' id='image'onClick={refreshOverview}/>
        ) : (<img src="https://images.unsplash.com/photo-1531425300797-d5dc8b021c84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt={product.name} id='image' onClick={refreshOverview}/>)
        }
        </div>
        <div className='card-details' onClick={refreshOverview}>
          <h4>{product.category}</h4>
          <h4>{product.name}</h4>
          {product.saleprice ? <h5><s style={{color: '#9c0303'}}>${product.price}</s>  ${product.saleprice}</h5> : <h5>${product.price}</h5>}
          <Rating productID={product.id} />
        </div>
      </div>
    </div>
  )
}

export default OutfitCards;