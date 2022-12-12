import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

import axios from 'axios';
import Stars from './Stars-Related.jsx';

const Rating = ({productID}) => {

  const [RNRData, setRNRData] = useState({n: null, avg: null});

  useEffect(() => {
    axios.get(`http://localhost:3001/reviews/meta?product_id=${productID}`)
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
      <Link activeClass="active" to="RnR" smooth={true}>{RNRData && <Stars number={RNRData.avg}/>} {RNRData.avg}</Link>
    </div>
  );
};

export default Rating;