import React, { useState, useEffect } from 'react';
import axios from 'axios';

let Comparison = ({currentProduct, comparedProduct}) => {
  let result = [];
  let currentFeatures = currentProduct.features;
  let comparedFeatures = comparedProduct.features;

  for (let i = 0; i < currentFeatures.length; i++) {
    result.push({feature: currentFeatures[i].feature, current: currentFeatures[i].value});
  }

  let featureValues = result.map((item) => item.feature); // gives all feature values
  let notIncluded = [];

  for (let j = 0; j < result.length; j++) {
    for (let k = 0; k < comparedFeatures.length; k++) {
      if (result[j].feature === comparedFeatures[k].feature) {
        result[j]['compared'] = comparedFeatures[k].value;
      }
    }
  }

  for (let k = 0; k < comparedFeatures.length; k++) {
    if(!featureValues.includes(comparedFeatures[k].feature)) {
      notIncluded.push({feature: comparedFeatures[k].feature, compared: comparedFeatures[k].value})
    }
  }

  let final = result.concat(notIncluded);

  return (
    <tbody>
      {final.map((row, index) => {
        return (
        <tr key={index}>
          <td>{row.current}</td>
          <td>{row.feature}</td>
          <td>{row.compared}</td>
        </tr>
        )
      })}
    </tbody>
  )
}

export default Comparison;