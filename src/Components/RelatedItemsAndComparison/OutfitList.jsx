import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaAngleRight, FaAngleLeft, FaPlusCircle} from 'react-icons/fa';
import './RelatedItems.css';
import OutfitCards from './OutfitCards.jsx';

const OutfitList = ({setproductId, currentProductInfo, selectedStyle}) => {
  // let storage = () => {
  //   const localStorageObjects = Object.values(localStorage);
  //   const newSet = localStorageObjects.map((item) => JSON.parse(item));
  //   return newSet;
  // }

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && localStorage.length !== 0) {
  //     const updatedStorage = storage();
  //   }
  // }, [])

  // const [currentStorage, setStorage] = useState(updatedStorage);

  // let outfitsID = outfits.map((item) => item.id);
  let addOutfit = () => {
    // if (!Storage.includes(currentProductInfo.id)) {
      setOutfits({id: currentProductInfo.id, category: currentProductInfo.category, name: currentProductInfo.name, price: currentProductInfo.default_price, image: selectedStyle.photos});
    // }
  }
  const slideLeft = () => {
    const slider = document.getElementById('outfit-list-slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  }
  const slideRight = () => {
    const slider = document.getElementById('outfit-list-slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  return (
    <div>
      <div className='outfit-list'>
        <h3>YOUR OUTFIT</h3>
        <div className='carousel-container'>
          <FaAngleLeft size={40} className='left-arrow' onClick={slideLeft}/>
           <div id='outfit-list-slider'>
             <div id='add-outfit' onClick={addOutfit}>
               <h2>Add to Outfit</h2>
               <FaPlusCircle size={75}/>
             </div>
             {outfits.map((product) => {
               return ( <OutfitCards key={product.id} product={product} setproductId={setproductId} /> )
             })}
           </div>
          <FaAngleRight size={40} className='right-arrow' onClick={slideRight}/>
        </div>
      </div>
    </div>
  )
}

export default OutfitList;