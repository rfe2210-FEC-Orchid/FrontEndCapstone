import React, { useState } from 'react';
import {FaStar} from 'react-icons/fa';
import Modal from './Modal.jsx';
import Rating from './Rating.jsx';
import {Link} from 'react-scroll';

const RelatedProductCards = ({product, setproductId, currentProductInfo}) => {
  const [modalState, setmodalState] = useState(false);

  let openModal = () => {
    setmodalState(!modalState);
  }
  let refreshOverview = () => {
    setproductId(product.id);
  }

  return (
    <div className='card'>
      <div>
        <div className='image-and-modal'>
          <FaStar size={20} className='toggle-modal' onClick={openModal}/>
          <Modal toggle={modalState} action={openModal} comparedProduct={product} currentProduct={currentProductInfo}/>
          {product.image[0].url ? (<Link to="overview" smooth={true}><img src={product.image[0].url} alt={product.name} id='image'onClick={refreshOverview} /></Link>) : (<Link to="overview" smooth={true}><img src="https://images.unsplash.com/photo-1531425300797-d5dc8b021c84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt={product.name} id='image' onClick={refreshOverview}/></Link>)
          }
        </div>
        <Link to="overview" smooth={true}><div className='card-details' onClick={refreshOverview}>
          <h4>{product.category}</h4>
          <h4>{product.name}</h4>
          {product.saleprice ? <h5><s style={{color: '#9c0303'}}>${product.price}</s>  ${product.saleprice}</h5> : <h5>${product.price}</h5>}
          <Rating productID={product.id} />
        </div></Link>
      </div>
    </div>
  )
}

export default RelatedProductCards;