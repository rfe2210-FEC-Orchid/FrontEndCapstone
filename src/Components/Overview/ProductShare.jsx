import React, { useState, useEffect } from 'react';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';

const ProductShare = (props) => {

  return (
    <span>
      <AiFillFacebook id="facebook"/>
      <AiFillInstagram id="instagram"/>
      <AiFillTwitterCircle id="twitter"/>
  </span>
  );
};

export default ProductShare;