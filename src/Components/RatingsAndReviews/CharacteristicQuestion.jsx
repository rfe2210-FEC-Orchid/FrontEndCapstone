import React, { useState, useEffect } from 'react';

const CharacteristicQuestion = ({characteristic, category, handleChoosingCharacteristics, characteristicsChosen}) => {
  const [selectionMeaning, setSelectionMeaning] = useState([]);

  useEffect (() => {
    if (category === "Size") {
      setSelectionMeaning(["A size too small", "1/2 a size too small", "PERFECT!", "1/2 a size too big", "A size too wide"])
    } else if (category === "Width") {
      setSelectionMeaning(["Too narrow", "Slightly narrow", "PERFECT!", "Slightly wide", "Too wide"])
    } else if (category === "Comfort") {
      setSelectionMeaning(["Uncomfortable", "Slightly uncomfortable", "Ok", "Comfortable", "PERFECT!"])
    } else if (category === "Quality") {
      setSelectionMeaning(["Poor", "Below Average", "What I expected", "Pretty great", "PERFECT!"])
    } else if (category === "Length") {
      setSelectionMeaning(["Runs short", "Runs slightly short", "PERFECT!", "Runs slightly long", "Runs long"])
    } else if (category === "Fit") {
      setSelectionMeaning(["Runs tight", "Runs slightly tight", "PERFECT!", "Runs slightly long", "Runs long"])
    }
  }, [])

  return (
    <div>
      <label>{category}</label><br/>
      <input required type="radio" name={characteristic.id} value={1} checked={characteristicsChosen[characteristic.id] === "1"} onChange={handleChoosingCharacteristics}/> 1 - {selectionMeaning[0]}
      <input type="radio" name={characteristic.id} value={2} checked={characteristicsChosen[characteristic.id] === "2"} onChange={handleChoosingCharacteristics}/> 2 - {selectionMeaning[1]}
      <input type="radio" name={characteristic.id} value={3} checked={characteristicsChosen[characteristic.id] === "3"} onChange={handleChoosingCharacteristics}/> 3 - {selectionMeaning[2]}
      <input type="radio" name={characteristic.id} value={4} checked={characteristicsChosen[characteristic.id] === "4"} onChange={handleChoosingCharacteristics}/> 4 - {selectionMeaning[3]}
      <input type="radio" name={characteristic.id} value={5} checked={characteristicsChosen[characteristic.id] === "5"} onChange={handleChoosingCharacteristics}/> 5 - {selectionMeaning[4]}
    </div>

  )
}

export default CharacteristicQuestion;