import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comparison from './Comparison.jsx';

let Modal = ({toggle, action, comparedProduct, currentProduct}) => {
  return (
    <div className={`modal-container ${toggle ? 'active' : ''}`}>
      <div className='related-products-modal'>
        <h1 style={{margin: '30px'}}>COMPARING</h1>
        <div id='table-container'>
          <table style={{margin: '30px'}}>
            <thead>
              <tr>
                <th>{currentProduct.name}</th>
                <th></th>
                <th>{comparedProduct.name}</th>
              </tr>
            </thead>
            <Comparison currentProduct={currentProduct} comparedProduct={comparedProduct}/>
          </table>
        </div>
        <div className='close' onClick={action}>X</div>
      </div>
    </div>
  )
}

export default Modal;