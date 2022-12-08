import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: block;
  height: 90%;
  width: 90%;

  background-size: 250%;
  background-image: url('${props => props.hoverEnabled ? props.src : 'undefined'}');
  background-position: ${props => props.hoverEnabled ? props.imagePosition : 'undefined'};
`;

const ExpandedViewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;

  opacity: ${props => props.hoverEnabled ? '0' : '1'};
  cursor: ${props => props.hoverEnabled ? 'zoom-out' : 'zoom-in'};
`;

const ExpandedImage = (props) => {

  // state
  const [hoverEnabled, setHoverEnabled] = useState(false);
  const [imagePosition, setImagePosition] = useState('');

  const toggleHoverZoom = () => {
    setHoverEnabled(!hoverEnabled);
  }

  const handleMouseMove = (e) => {
    const {left, top, width, height} = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
    setImagePosition(`${x}% ${y}%`);
  }

  return (
    <Wrapper
      src={props.photo.url}
      hoverEnabled={hoverEnabled}
      imagePosition={imagePosition}
    >
      <ExpandedViewImage
        src={props.photo.url}
        onClick={toggleHoverZoom}
        hoverEnabled={hoverEnabled}
        onMouseMove={hoverEnabled ? handleMouseMove : undefined}
      />
    </Wrapper>
  );
};

export default ExpandedImage;



















// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// const Wrapper = styled.div`
//   display: block;
//   height: 90%;
//   width: 90%;
// `;

// const ExpandedViewImage = styled.img`
//   // width: 100%;
//   // height: 100%;
//   object-fit: cover;

//   width: ${props => props.hoverEnabled ? '250%' : '100%'};
//   height: ${props => props.hoverEnabled ? '250%' : '100%'};
//   overflow: hidden;
//   object-position: ${props => props.hoverEnabled ? props.imagePosition : 'undefined'};
//   cursor: ${props => props.hoverEnabled ? 'zoom-out' : 'zoom-in'};
// `;

// const ExpandedImage = (props) => {

//   // state
//   const [hoverEnabled, setHoverEnabled] = useState(false);
//   const [imagePosition, setImagePosition] = useState('');

//   const toggleHoverZoom = () => {
//     setHoverEnabled(!hoverEnabled);
//   }

//   const handleMouseMove = (e) => {
//     const {left, top, width, height} = e.target.getBoundingClientRect();
//     const x = (e.pageX - left) / width * 250;
//     const y = (e.pageY - top) / height * 250;
//     setImagePosition(`${x}% ${y}%`);
//     console.log('mouse moving:', x, y);
//   }

//   return (
//     <Wrapper
//     >
//       <ExpandedViewImage
//         src={props.photo.url}
//         onClick={toggleHoverZoom}
//         hoverEnabled={hoverEnabled}
//         onMouseMove={hoverEnabled ? handleMouseMove : undefined}
//         imagePosition={imagePosition}
//       />
//     </Wrapper>
//   );
// };

// export default ExpandedImage;


















// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// const Wrapper = styled.div`
//   display: block;
//   height: 90%;
//   width: 90%;
// `;

// const ExpandedViewImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: contain;
// `;

// const ExpandedImage = (props) => {

//   // state
//   const [hoverEnabled, setHoverEnabled] = useState(false);

//   return (
//     <Wrapper>
//       <ExpandedViewImage
//         src={props.photo.url}
//       />
//     </Wrapper>
//   );
// };

// export default ExpandedImage;