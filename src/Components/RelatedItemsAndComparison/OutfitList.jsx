import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaAngleRight, FaAngleLeft, FaPlusCircle} from 'react-icons/fa';
import './RelatedItems.css';
import OutfitCards from './OutfitCards.jsx';

const OutfitList = ({setproductId, currentProductInfo, selectedStyle}) => {
  const [outfits, setOutfits] = useState([]);

  let localOufitList = localStorage.getItem('outfits');

  const currentOutfit = {id: currentProductInfo.id, category: currentProductInfo.category, name: currentProductInfo.name, price: currentProductInfo.default_price, image: selectedStyle.photos};

  const addOutfit = () => {
    let outfitCopy = [...outfits];
    let {id} = currentOutfit;
    console.log('currentOutfit: ', currentOutfit);
    let existingitem = outfitCopy.find((outfitItem) => outfitItem.id === id);
    if (!existingitem) {
      outfitCopy.push(currentOutfit);
    } else {
      console.log('this product already exists in your outfit list');
    }
    setOutfits(outfitCopy);
    let stringOutfits = JSON.stringify(outfitCopy);
    localStorage.setItem('outfits', stringOutfits);
  };

  const removeOutfit = (itemID) => {
    let outfitCopy = [...outfits];
    outfitCopy = outfitCopy.filter((item) => item.id != itemID);
    setOutfits(outfitCopy);
    let stringOutfits = JSON.stringify(outfitCopy);
    localStorage.setItem('outfits', stringOutfits);
  };

  useEffect(() => {
    localOufitList = JSON.parse(localOufitList);
    if (typeof window !== 'undefined' && localOufitList) {
      setOutfits(localOufitList);
    }
  }, [])

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
               return ( <OutfitCards key={product.id} product={product} setproductId={setproductId} deleteOutfit={removeOutfit}/> )
             })}
           </div>
          <FaAngleRight size={40} className='right-arrow' onClick={slideRight}/>
        </div>
      </div>
    </div>
  )
}

export default OutfitList;