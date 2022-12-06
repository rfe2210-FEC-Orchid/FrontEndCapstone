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
    setPhotos(props.photos.slice(0, 7));
    console.log('useEffect running in gallery');
  }, [props.photos]);

  // functions
  const sliderUp = () => {
    setSliderLimits
  };

  const sliderDown = () => {

  };

  return (
    <div>
      <div>
        {props.photos.length > 7 && <AiOutlineArrowUp onClick={sliderUp}/>}
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
        <AiOutlineArrowDown onClick={sliderDown}/>
      </div>
      {photoIndex > 0 && <AiOutlineArrowLeft onClick={() => setPhotoIndex(photoIndex - 1)}/>}
      <SelectedImage photo={photos[photoIndex]}/>
      {photoIndex < props.photos.length - 1 && <AiOutlineArrowRight onClick={() => setPhotoIndex(photoIndex + 1)}/>}
    </div>
  );
};

export default ImageGallery;