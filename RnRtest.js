let testData = {
  product_id: '37311',
  ratings: { '1': '52', '2': '32', '3': '86', '4': '121', '5': '304' },
  recommended: { false: '96', true: '499' },
  characteristics: {
    Fit: { id: 125031, value: '3.1259640102827763' },
    Length: { id: 125032, value: '3.1741293532338308' },
    Comfort: { id: 125033, value: '3.2613333333333333' },
    Quality: { id: 125034, value: '3.2841530054644809' }
  }
};

const getRnRdata = (ratings) => {
  let RnRdata = {n: 0, avg: 0};

  for (let rating in ratings) {
    RnRdata.n += parseInt(ratings[rating]);
    RnRdata.avg += parseInt(rating) * parseInt(ratings[rating]);
  }

  RnRdata.avg = Math.round(((RnRdata.avg / RnRdata.n) * 10) / 10);

  return RnRdata;
};

console.log(getRnRdata(testData.ratings));
