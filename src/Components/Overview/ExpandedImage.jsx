import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineClose } from 'react-icons/ai';
import { RxDot, RxDotFilled } from 'react-icons/rx';

const Wrapper = styled.div`
  position: relative;
  display: block;
  // height: calc(100% - 46px);
  height: 100%;
  width: 100%;
  background-size: 250%;
  background-image: url('${props => props.hoverEnabled ? props.src : 'undefined'}');
  background-position: ${props => props.hoverEnabled ? props.imagePosition : 'undefined'};

  i {
    position: absolute;
    top: 0;
    right: 0;
    margin: 5px;
    &:hover {
      cursor: pointer;
    }
`;

const ExpandedViewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.hoverEnabled ? '0' : '1'};
  cursor: ${props => props.hoverEnabled ? 'zoom-out' : 'zoom-in'};
`;

const ExpandedButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Arrow = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Placeholder = styled.div`
  display: inline-block;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`;

const ExpandedImage = (props) => {

  const [imagePosition, setImagePosition] = useState('');

  const handleMouseMove = (e) => {
    const {left, top, width, height} = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
    setImagePosition(`${x}% ${y}%`);
  };

  return (
    <Wrapper
      src={props.photo.url}
      hoverEnabled={props.hoverEnabled}
      imagePosition={imagePosition}
    >

      <ExpandedViewImage
        src={props.photo.url}
        data-testid='expanded-image-view'
        onClick={(e) => {
          props.setHoverEnabled(!props.hoverEnabled);
          props.handleTrack(e, 'ExpandedImageView')
        }}
        hoverEnabled={props.hoverEnabled}
        onMouseMove={props.hoverEnabled ? handleMouseMove : undefined}
      />
      {!props.hoverEnabled && <i onClick={() => props.setShowExpandedImage(false)}><AiOutlineClose color={'black'} size={40}/></i>}

      {!props.hoverEnabled &&
        <ExpandedButtonContainer>
          {(props.sliderLimits.min > 0 || props.photoIndex > 0)
            ? <Arrow><AiOutlineArrowLeft onClick={() => props.decrementPhotoIndex()} color={'black'} size={40}/></Arrow>
            : <Placeholder size={40}></Placeholder>}

          {props.photos.map((photo, index) => (
            index === props.photoIndex
              ? <RxDotFilled color={'black'} size={40} key={index} onClick={() => props.setPhotoIndex(index)}/>
              : <RxDot color={'black'} size={40} key={index} onClick={() => props.setPhotoIndex(index)}/>
          ))}

          {(props.sliderLimits.max < props.photos.length - 1 || props.photoIndex < props.photos.length - 1)
            ? <Arrow><AiOutlineArrowRight onClick={() => props.incrementPhotoIndex()} color={'black'} size={40}/></Arrow>
            : <Placeholder size={40}></Placeholder>}
        </ExpandedButtonContainer>}
    </Wrapper>
  );
};

export default ExpandedImage;
