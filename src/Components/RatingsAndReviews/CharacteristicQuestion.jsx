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
      <div className="charquestion-container">
        <label className="radio-choice">
          <input required type="radio" name={characteristic.id} value={1} checked={characteristicsChosen[characteristic.id] === 1} onChange={handleChoosingCharacteristics}/>
          <span className="radio-span" >{"1 - " + selectionMeaning[0]}</span>
        </label>

        <label className="radio-choice">
          <input type="radio" name={characteristic.id} value={2} checked={characteristicsChosen[characteristic.id] === 2} onChange={handleChoosingCharacteristics}/>
          <span className="radio-span">{"2 - " + selectionMeaning[1]}</span>
        </label>

        <label className="radio-choice">
          <input type="radio" name={characteristic.id} value={3} checked={characteristicsChosen[characteristic.id] === 3} onChange={handleChoosingCharacteristics}/>
          <span className="radio-span">{"3 - "+ selectionMeaning[2]}</span>
        </label>

        <label className="radio-choice">
          <input type="radio" name={characteristic.id} value={4} checked={characteristicsChosen[characteristic.id] === 4} onChange={handleChoosingCharacteristics}/>
          <span className="radio-span">{"4 - " + selectionMeaning[3]}</span>
        </label>

        <label className="radio-choice">
          <input type="radio" name={characteristic.id} value={5} checked={characteristicsChosen[characteristic.id] === 5} onChange={handleChoosingCharacteristics}/>
          <span className="radio-span">{"5 - " + selectionMeaning[4]}</span>
        </label>
      </div>
    </div>
  )
}

export default CharacteristicQuestion;