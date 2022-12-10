import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaRegStar} from 'react-icons/fa';
import Modal from './Modal.jsx';

const RelatedProductCards = ({product, setproductId}) => {
  const [modalState, setmodalState] = useState(false);

  let openModal = () => {
    setmodalState(!modalState);
  }
  let refreshOverview = () => {
    console.log('I got clicked, and I should be refreshing the page')
    setproductId(product.id);
  }

  return (
    <div className='card'>
      <FaRegStar size={20} className='toggle-modal' onClick={openModal}/>
      <Modal toggle={modalState} action={openModal} />
      <div onClick={refreshOverview}>
        {product.image ? (
          <img src={product.image[0].url} alt={product.name} width='230' height='230' className='image'/>
          ) : 'image not available'
        }
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

export default RelatedProductCards;