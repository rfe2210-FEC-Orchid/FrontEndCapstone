import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Photo = ({photo}) => {
  return(
    <div>
      <img src={photo} width="30%" height = "40%"/>
    </div>
  )

}

export default Photo