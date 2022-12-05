import React, { useState, useEffect } from 'react';

const StyleSelector = (props) => {

  return (
    <div>
      <ul>
        {props.styles && props.styles.map((style) =>
        <img
          key={style.style_id}
          src={style.photos[0].thumbnail_url}
          height={100} // will update this later, it was just a bit obnoxiosly large
          onClick={() => props.handleChangeStyle(style)}
        />
        )}
      </ul>
    </div>
  );
};

export default StyleSelector;