import React, { useState, useEffect } from 'react';
import axios from 'axios';

let Modal = ({toggle, action}) => {
  const modalState = toggle;
  return (
    <div className={`modal-container ${modalState ? 'active' : ''}`}>
      <div className='modal'>
        <h2 style={{margin: '30px'}}>COMPARING</h2>
        <table style={{margin: '30px'}}>
          <thead>
            <tr>
              <th>Current Product Name</th>
              <th></th>
              <th>Compared Product Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Current Product Value</td>
              <td>Characteristic</td>
              <td>Compared Product Value</td>
            </tr>
          </tbody>
        </table>
        <div className='close' onClick={action}></div>
      </div>
    </div>
  )
}

export default Modal;


