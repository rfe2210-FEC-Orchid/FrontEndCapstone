import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ExpandedImage = (props) => {

  return (
    <>
      <img
        src={props.photo.url}
      />
    </>
  );
};

export default ExpandedImage;