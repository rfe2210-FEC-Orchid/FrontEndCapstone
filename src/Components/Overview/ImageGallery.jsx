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
  border: ${props => props.selected ? "2px solid #4F0B40" : "2px solid white"};

  &:hover {
    cursor: pointer;
    border: 2px solid #4F0B40;
  }
`;

const SelectedImageContainer = styled.div`
  display: inline-block;
  position: relative;
  width: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ExpandedImageContainer = styled.div`
  position: relative;
  height: 814px;

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 4;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ExpandedButtonContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Arrow = styled.i`
  &:hover {
    cursor: pointer;
  }
`;

const Placeholder = styled.div`
  display: inline-block;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`;

const defualt_url = 'https://images.unsplash.com/photo-1531425300797-d5dc8b021c84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

const defualt_photo = {
  thumbnail_url: defualt_url,
  url: defualt_url
};

const ImageGallery = (props) => {

  // state
  const [photoIndex, setPhotoIndex] = useState(0);
  const [sliderLimits, setSliderLimits] = useState({min:0, max: 6});
  const [photos, setPhotos] = useState([]);
  const [hoverEnabled, setHoverEnabled] = useState(false);

  useEffect(() => {
    if (!props.photos[0].thumbnail_url || !props.photos[0].url) {
      setPhotos([defualt_photo]);
    } else {
      setPhotos(props.photos.slice(sliderLimits.min, sliderLimits.max + 1));
    }

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

  useEffect(() => {
    console.log('toggling hover enabled:', hoverEnabled);
  }, [hoverEnabled]);

  return (
    <Gallery>
      {!props.showExpandedImage
      ? (<><SliderContainer>
          {(props.photos.length > 7) && (sliderLimits.min > 0)
            ? <Arrow><AiOutlineArrowUp onClick={sliderUp} size={25}/></Arrow>
            : <Placeholder size={30}></Placeholder>}

              {photos.map((photo, index) =>
                <SliderImage
                  src={photo.thumbnail_url}
                  selected={index === photoIndex}
                  key={index}
                  onClick={() => setPhotoIndex(index)}
                />
              )}

          {(props.photos.length > 7) && (sliderLimits.max < props.photos.length - 1)
            ? <Arrow><AiOutlineArrowDown onClick={sliderDown} size={25}/></Arrow>
            : <Placeholder size={30}></Placeholder>}
        </SliderContainer>

        <SelectedImageContainer>
          <SelectedImage
            photo={photos[photoIndex]}
            setShowExpandedImage={props.setShowExpandedImage}
          />

          <ButtonContainer>
            {(sliderLimits.min > 0 || photoIndex > 0)
              ? <Arrow><AiOutlineArrowLeft onClick={decrementPhotoIndex} size={40}/></Arrow>
              : <Placeholder size={40}></Placeholder>}
            {(sliderLimits.max < props.photos.length - 1 || photoIndex < photos.length - 1)
              ? <Arrow><AiOutlineArrowRight onClick={incrementPhotoIndex} size={40}/></Arrow>
              : <Placeholder size={40}></Placeholder>}
          </ButtonContainer>
        </SelectedImageContainer></>)

      : (<ExpandedImageContainer >
          <ExpandedImage
            setShowExpandedImage={props.setShowExpandedImage}
            setHoverEnabled={setHoverEnabled}
            hoverEnabled={hoverEnabled}
            photo={photos[photoIndex]}
            photos={photos}
            sliderLimits={sliderLimits}
            decrementPhotoIndex={decrementPhotoIndex}
            incrementPhotoIndex={incrementPhotoIndex}
            photoIndex={photoIndex}
            setPhotoIndex={setPhotoIndex}
          />
        </ExpandedImageContainer>)}

    </Gallery>
  );
};

export default ImageGallery;