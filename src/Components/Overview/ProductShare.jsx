import React from 'react';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import styled from 'styled-components';

const ShareContainer = styled.span`
  margin: 10px 5px;
`;

const ProductShare = (props) => {

  return (
    <ShareContainer>
      <a href="https://www.facebook.com/" style={{color: 'black'}}><AiFillFacebook id="facebook" size={30}/></a>

      <a href="https://www.instagram.com/" style={{color: 'black'}}><AiFillInstagram id="instagram" size={30}/></a>

      <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false">
        <AiFillTwitterCircle id="twitter" style={{color: 'black'}} size={30}/>
      </a>

      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
  </ShareContainer>
  );
};

export default ProductShare;