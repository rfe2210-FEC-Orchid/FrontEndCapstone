import React, { useState, useEffect } from 'react';
import {FaAngleRight, FaAngleLeft, FaPlusCircle} from 'react-icons/fa';
import './RelatedItems.css';
import OutfitCards from './OutfitCards.jsx';

const OutfitList = ({setproductId, currentProductInfo, selectedStyle}) => {
  const [outfits, setOutfits] = useState([]);
  const [checkScroll, setcheckScroll] = useState(false);

  let localOufitList = localStorage.getItem('outfits');

  const currentOutfit = {id: selectedStyle.style_id, category: currentProductInfo.category, name: currentProductInfo.name, price: currentProductInfo.default_price, saleprice: selectedStyle.sale_price, image: selectedStyle.photos, productid: currentProductInfo.id};

  useEffect(() => {
    localOufitList = JSON.parse(localOufitList);
    if (typeof window !== 'undefined' && localOufitList) {
      setOutfits(localOufitList);
    }

    const slider = document.getElementById('outfit-list-slider');
    let rightScrollMax = slider.scrollWidth - slider.clientWidth;
    const leftArrow = document.getElementById('outfit-left');
    const rightArrow = document.getElementById('outfit-right');

    if (slider.scrollLeft === rightScrollMax) {
      rightArrow.style.visibility = "hidden";
    } else if (slider.scrollLeft < rightScrollMax) {
      rightArrow.style.visibility = "visible";
    }

    if (slider.scrollLeft === 0) {
      leftArrow.style.visibility = "hidden";
    } else if (slider.scrollLeft > 0) {
      leftArrow.style.visibility = "visible";
    }
  }, [checkScroll, currentProductInfo.id])

  const slideLeft = () => {
    const slider = document.getElementById('outfit-list-slider');
    slider.scrollLeft = slider.scrollLeft - 500;
    setTimeout(() => {
      setcheckScroll(!checkScroll);
    }, 350)
  }

  const slideRight = () => {
    const slider = document.getElementById('outfit-list-slider');
    slider.scrollLeft = slider.scrollLeft + 500;
    setTimeout(() => {
      setcheckScroll(!checkScroll);
    }, 350)
  }

  const addOutfit = () => {
    let outfitCopy = [...outfits];
    let {id} = currentOutfit;
    let existingitem = outfitCopy.find((outfitItem) => outfitItem.id === id);
    if (!existingitem) {
      outfitCopy.push(currentOutfit);
    } else {
      console.log('this product already exists in your outfit list');
    }
    setOutfits(outfitCopy);
    let stringOutfits = JSON.stringify(outfitCopy);
    localStorage.setItem('outfits', stringOutfits);

    const slider = document.getElementById('outfit-list-slider');
    let rightScrollMax = slider.scrollWidth - slider.clientWidth;
    const rightArrow = document.getElementById('outfit-right');

    if (slider.scrollLeft === rightScrollMax) {
      rightArrow.style.visibility = "visible";
    } else if (slider.scrollLeft < rightScrollMax) {
      rightArrow.style.visibility = "visible";
    }
  };

  const removeOutfit = (itemID) => {
    let outfitCopy = [...outfits];
    outfitCopy = outfitCopy.filter((item) => item.id != itemID);
    setOutfits(outfitCopy);
    let stringOutfits = JSON.stringify(outfitCopy);
    localStorage.setItem('outfits', stringOutfits);
  };

  return (
    <div>
      <div className='outfit-list'>
        <h2>YOUR OUTFIT</h2>
        <div className='carousel-container'>
          <FaAngleLeft size={40} className='left-arrow' id='outfit-left' onClick={slideLeft}/>
           <div id='outfit-list-slider'>
             <div id='add-outfit' onClick={addOutfit}>
               <h2>Add to Outfit</h2>
               <FaPlusCircle size={75}/>
             </div>
             {outfits.map((product) => {
               return ( <OutfitCards key={product.id} product={product} setproductId={setproductId} deleteOutfit={removeOutfit}/> )
             })}
           </div>
          <FaAngleRight size={40} className='right-arrow' id='outfit-right' onClick={slideRight}/>
        </div>
      </div>
    </div>
  )
}

export default OutfitList;