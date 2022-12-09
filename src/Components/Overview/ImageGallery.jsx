import React, { useState, useEffect } from 'react';
import SelectedImage from'./SelectedImage.jsx';
import ExpandedImage from './ExpandedImage.jsx';

import styled from 'styled-components';
import { AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowUp, AiOutlineClose } from 'react-icons/ai';
import { RxDot, RxDotFilled } from 'react-icons/rx';

// styles
const Gallery = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SliderImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  padding: 2.5px;
  margin: 2.5px;
  border: ${props => props.selected ? "2px solid black" : "2px solid white"};
`;

const SelectedImageContainer = styled.div`
  position: relative;
  // width: 80%;
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ExpandedImageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.i`
  postion: absolute;
  // top: 0;
  margin: 5px;
  align-self: flex-end;
`;

const ButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ExpandedButtonContainer = styled.div`
  bottom: 0;
  width: 100%;
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Placeholder = styled.div`
  display: inline-block;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`;

const dotStyle = {
  size: '40px',
  color: 'white'
}

const ImageGallery = (props) => {

  // state
  const [photoIndex, setPhotoIndex] = useState(0);
  const [sliderLimits, setSliderLimits] = useState({min:0, max: 6});
  const [photos, setPhotos] = useState([]);
  const [showExpandedImage, setShowExpandedImage] = useState(false);

  useEffect(() => {
    setPhotos(props.photos.slice(sliderLimits.min, sliderLimits.max + 1));
    if (!props.photos[photoIndex]) {
      setPhotoIndex(0);
    }
  }, [props.photos]);

  useEffect(() => {
    setPhotos(props.photos.slice(sliderLimits.min, sliderLimits.max + 1));
  }, [sliderLimits]);

  // functions
  const sliderDown = () => {
    setSliderLimits({
      min: sliderLimits.min + 1,
      max: sliderLimits.max + 1
    });

    if (photoIndex > 0) {
      setPhotoIndex(photoIndex - 1);
    }
  };

  const sliderUp = () => {
    setSliderLimits({
      min: sliderLimits.min - 1,
      max: sliderLimits.max - 1
    });

    if (photoIndex < 6) {
      setPhotoIndex(photoIndex + 1);
    }
  };

  const decrementPhotoIndex = () => {
    if (photoIndex > 0) {
      setPhotoIndex(photoIndex - 1);
    } else if ((photoIndex === 0) && (sliderLimits.min > 0)) {
      setSliderLimits({
        min: sliderLimits.min - 1,
        max: sliderLimits.max - 1
      });
    }
  };

  const incrementPhotoIndex = () => {
    if (photoIndex < photos.length - 1) {
      setPhotoIndex(photoIndex + 1);
    } else if ((photoIndex === (photos.length - 1)) && (sliderLimits.max < (props.photos.length - 1))) {
      setSliderLimits({
        min: sliderLimits.min + 1,
        max: sliderLimits.max + 1
      });
    }
  };

  return (
    <Gallery>
      <SliderContainer>
        {(props.photos.length > 7) && (sliderLimits.min > 0) ? <AiOutlineArrowUp onClick={sliderUp} size={25}/> : <Placeholder size={25}></Placeholder>}
            {photos.map((photo, index) =>
              <SliderImage
                src={photo.thumbnail_url}
                selected={index === photoIndex}
                key={index}
                onClick={() => setPhotoIndex(index)}
              />
            )}
        {(props.photos.length > 7) && (sliderLimits.max < props.photos.length - 1) ? <AiOutlineArrowDown onClick={sliderDown} size={25}/> : <Placeholder size={25}></Placeholder>}
      </SliderContainer>

      <SelectedImageContainer>
        <SelectedImage
          photo={photos[photoIndex]}
          setShowExpandedImage={setShowExpandedImage}
        />
        <ButtonContainer>
          {(sliderLimits.min > 0 || photoIndex > 0) ? <AiOutlineArrowLeft onClick={decrementPhotoIndex} size={40}/> : <div></div>}
          {(sliderLimits.max < props.photos.length - 1 || photoIndex < photos.length - 1) ? <AiOutlineArrowRight
          onClick={incrementPhotoIndex} size={40}/> : <div></div>}
        </ButtonContainer>
      </SelectedImageContainer>

      {showExpandedImage &&
      <ExpandedImageContainer>
        <CloseButton onClick={() => setShowExpandedImage(false)}><AiOutlineClose color={'white'} size={40}/></CloseButton>
        <ExpandedImage
          photo={photos[photoIndex]}
        />

        <ExpandedButtonContainer>
          {(sliderLimits.min > 0 || photoIndex > 0) ? <AiOutlineArrowLeft onClick={decrementPhotoIndex} color={'white'} size={40}/> : <Placeholder size={40}></Placeholder>}

          {photos.map((photo, index) => (
            index === photoIndex ? <RxDotFilled color={'white'} size={40} key={index} onClick={() => setPhotoIndex(index)}/> : <RxDot color={'white'} size={40} key={index} onClick={() => setPhotoIndex(index)}/>
          ))}

          {(sliderLimits.max < props.photos.length - 1 || photoIndex < photos.length - 1) ? <AiOutlineArrowRight onClick={incrementPhotoIndex} color={'white'} size={40}/> : <Placeholder size={40}></Placeholder>}
        </ExpandedButtonContainer>
      </ExpandedImageContainer>}

    </Gallery>
  );
};

export default ImageGallery;