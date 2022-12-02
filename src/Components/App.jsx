import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Overview from './Overview/Overview.jsx';
import RnR from './RatingsAndReviews/RnR.jsx';
import RelatedItems from './RelatedItemsAndComparison/RelatedItems.jsx';
import QA from './QuestionsAndAnswers/QA.jsx';

const App = (props) => {
  return (
    <div>
      <Overview />
      <RelatedItems />
      <QA />
      <RnR />
    </div>
  );
};

export default App;
