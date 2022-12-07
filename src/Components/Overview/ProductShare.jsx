import React, { useState, useEffect } from 'react';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';

const ProductShare = (props) => {

  return (
    <span>
      <AiFillFacebook id="facebook"/>
      <AiFillInstagram id="instagram"/>


      <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">
        <AiFillTwitterCircle id="twitter"/>
      </a>

      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  </span>
  );
};

export default ProductShare;