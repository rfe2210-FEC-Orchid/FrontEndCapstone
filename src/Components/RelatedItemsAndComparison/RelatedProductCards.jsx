import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaStar} from 'react-icons/fa';
import Modal from './Modal.jsx';

const RelatedProductCards = ({product, setproductId, currentProductInfo}) => {
  const [modalState, setmodalState] = useState(false);

  let openModal = () => {
    setmodalState(!modalState);
  }
  let refreshOverview = () => {
    console.log('I got clicked, and I should be refreshing the page:')
    setproductId(product.id);
  }

  return (
    <div className='card'>
      <div>
        <div className='image-and-modal'>
          <FaStar size={20} className='toggle-modal' onClick={openModal}/>
          <Modal toggle={modalState} action={openModal} comparedProduct={product} currentProduct={currentProductInfo}/>
          {product.image ? (<img src={product.image[0].url} alt={product.name} id='image'/>) : 'image not available'
          }
        </div>
        <div className='card-details' onClick={refreshOverview}>
          <h4>{product.category}</h4>
          <h4>{product.name}</h4>
          <h5>${product.price}</h5>
          <p>★★★★★</p>
        </div>
      </div>
    </div>
  )
}

export default RelatedProductCards;