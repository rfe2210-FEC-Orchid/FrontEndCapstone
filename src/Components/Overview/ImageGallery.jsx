import React, { useState, useEffect } from 'react';
import SelectedImage from'./SelectedImage.jsx';
import ExpandedImage from './ExpandedImage.jsx';

import styled from 'styled-components';
import { AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowUp } from 'react-icons/ai';

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
  justify-content: flex-start;
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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ExpandedImageContainer = styled.div`
  position: fixed;


  background: #000;
  z-index: 10;
`;

const ImageGallery = (props) => {

  // state
  const [photoIndex, setPhotoIndex] = useState(0);
  const [sliderLimits, setSliderLimits] = useState({min:0, max: 6});
  const [photos, setPhotos] = useState([]);
  const [showExpandedImage, setShowExpandedImage] = useState(false);

  useEffect(() => {
    setPhotos(props.photos.slice(sliderLimits.min, sliderLimits.max + 1));
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
        {(props.photos.length > 7) && (sliderLimits.min > 0) && <AiOutlineArrowUp onClick={sliderUp}/>}
            {photos.map((photo, index) =>
              <SliderImage
                src={photo.thumbnail_url}
                selected={index === photoIndex}
                key={index}
                onClick={() => setPhotoIndex(index)}
              />
            )}
        {(props.photos.length > 7) && (sliderLimits.max < props.photos.length - 1) && <AiOutlineArrowDown onClick={sliderDown}/>}
      </SliderContainer>
      <SelectedImageContainer>
        <SelectedImage
          photo={photos[photoIndex]}
          setShowExpandedImage={setShowExpandedImage}
        />
        <div>
          {(sliderLimits.min > 0 || photoIndex > 0) && <AiOutlineArrowLeft onClick={decrementPhotoIndex}/>}
          {(sliderLimits.max < props.photos.length - 1 || photoIndex < photos.length - 1) && <AiOutlineArrowRight
          onClick={incrementPhotoIndex}/>}
        </div>
      </SelectedImageContainer>

      {showExpandedImage &&
      <ExpandedImageContainer>
        <ExpandedImage
          photo={photos[photoIndex]}
          setShowExpandedImage={setShowExpandedImage}
        />
        <button onClick={() => setShowExpandedImage(false)}>X</button>
      </ExpandedImageContainer>}
    </Gallery>
  );
};

export default ImageGallery;