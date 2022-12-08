import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stars from './Stars.jsx';

const ProductRating = (props) => {

  const [RNRData, setRNRData] = useState({n: null, avg: null});

  useEffect(() => {
    axios.get(`http://localhost:3001/reviews/meta?product_id=${props.productID}`)
      .catch((err) => {
        console.log('error retieving RNR metadata:', err);
      })
      .then((response) => {
        console.log('got RNR data:', response.data);

        let ratings = response.data.ratings;

        console.log(ratings);
        let RnRdata = {n: 0, avg: 0};

        for (let rating in ratings) {
          RnRdata.n += parseInt(ratings[rating]);
          RnRdata.avg += parseInt(rating) * parseInt(ratings[rating]);
        }

        RnRdata.avg = (Math.round((RnRdata.avg / RnRdata.n) * 10) / 10);

        setRNRData(RnRdata);
      })
  }, []);

  return (
    <div>
      {RNRData && <Stars number={RNRData.avg}/>}
      <a> {RNRData.avg} ({RNRData.n})</a>
    </div>
  );
};

export default ProductRating;