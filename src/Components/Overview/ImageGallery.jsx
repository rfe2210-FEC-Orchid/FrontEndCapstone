import React, { useState, useEffect } from 'react';
import SelectedImage from'./SelectedImage.jsx';
import ExpandedImage from './ExpandedImage.jsx';
import { AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowUp } from 'react-icons/ai';

const ImageGallery = (props) => {

  // state
  const [photoIndex, setPhotoIndex] = useState(0);
  const [sliderLimits, setSliderLimits] = useState({min:0, max: 6});
  const [photos, setPhotos] = useState([]);

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
    <div>
      <div>
        {(props.photos.length > 7) && (sliderLimits.min > 0) && <AiOutlineArrowUp onClick={sliderUp}/>}
          <div>
            {photos.map((photo, index) =>
              <img
                src={photo.url}
                key={index}
                height={100}
                onClick={() => setPhotoIndex(index)}
              />
            )}
          </div>
        {(props.photos.length > 7) && (sliderLimits.max < props.photos.length - 1) && <AiOutlineArrowDown onClick={sliderDown}/>}
      </div>
      {(sliderLimits.min > 0 || photoIndex > 0) && <AiOutlineArrowLeft onClick={decrementPhotoIndex}/>}
      <SelectedImage photo={photos[photoIndex]}/>
      {(sliderLimits.max < props.photos.length - 1 || photoIndex < photos.length - 1) && <AiOutlineArrowRight onClick={incrementPhotoIndex}/>}
    </div>
  );
};

export default ImageGallery;