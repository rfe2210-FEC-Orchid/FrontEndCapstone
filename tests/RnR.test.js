// import React from 'react';
// import '@testing-library/jest-dom';
// import '@testing-library/react/dont-cleanup-after-each'
// import userEvent from '@testing-library/user-event'
// import {render, screen} from '@testing-library/react';
// import App from '../src/components/App.jsx'
// import axios from 'axios';

// // axios.defaults.baseURL = 'http://localhost:3000';


// describe('RnR testing', function () {
//   const user = userEvent.setup();
//   render(<App />);

//   //sort option for reviewlists
//   it('should let me choose to sort by newest ', () => {
//     expect(screen.getByTestId('sort-option')).toHaveTextContent("relevance");
//     return user.click((screen.getByTestId('sort-option')))
//       .then(() => {
//         return user.click((screen.getByTestId('sort-newest')))
//       })
//       .then(() => {
//         expect(screen.getByTestId('sort-option')).toHaveTextContent("newest");
//       })
//   });

//   it('should let me choose to sort by relevance ', () => {
//     return user.click((screen.getByTestId('sort-option')))
//       .then(() => {
//         return user.click((screen.getByTestId('sort-relevance')))
//       })
//       .then(() => {
//         expect(screen.getByTestId('sort-option')).toHaveTextContent("relevance");
//       })
//   });

//   //Review Modals
//   let reviewForm = screen.getByTestId('review-form'); //review form
//   it('should let me open review modal ', () => {
//     expect(screen.getByTestId('review-modal-overlay')).not.toBeVisible(); //overlay should not be visible at first
//     expect(screen.getByTestId('form-container')).not.toBeVisible(); //form containershould not be visible at first
//     expect(reviewForm).not.toBeVisible(); //form containershould not be visible at first
//     return user.click((screen.getByTestId('add-review-button')))
//       .then(() => {
//         expect(screen.getByTestId('review-modal-overlay')).toBeVisible();
//         expect(screen.getByTestId('form-container')).toBeVisible();
//         expect(reviewForm).toBeVisible();
//       })
//   });

//   it('should let me close review modal and reopen', () => {
//     expect(screen.getByTestId('review-modal-overlay')).toBeVisible(); //overlay should be visible now
//     expect(screen.getByTestId('form-container')).toBeVisible(); //form container should be visible now
//     expect(reviewForm).toBeVisible(); //form containershould be visible at now
//     return user.click((screen.getByTestId('reviewForm-closeBtn')))
//       .then(() => {
//         expect(screen.getByTestId('review-modal-overlay')).not.toBeVisible();
//         expect(screen.getByTestId('form-container')).not.toBeVisible();
//         expect(reviewForm).not.toBeVisible();
//       })
//       .then(() => {
//         return user.click((screen.getByTestId('add-review-button'))) //click add review again so remaining tests work
//       })
//       .then(() => {
//         expect(screen.getByTestId('review-modal-overlay')).toBeVisible();
//         expect(screen.getByTestId('form-container')).toBeVisible();
//         expect(reviewForm).toBeVisible();
//       })
//   });

//   //review modal inputs

//   it('should able to update if I recommend Product ', () => {
//     expect(reviewForm).toHaveFormValues({ifRecommend: "true"}); //should be defaulted as yes
//     return user.click(screen.getByTestId('noRecommendBtn'))  // clicked No
//       .then(() => {
//         expect(reviewForm).toHaveFormValues({ifRecommend: "false"});  //form has ifRecommend as False
//         return user.click(screen.getByTestId('doRecommendBtn'))   //clicked Yes
//       })
//       .then(() => {
//         expect(reviewForm).toHaveFormValues({ifRecommend: "true"});  //form has ifRecommend as True;
//       })
//   });

//   it('should able to update and input in Review Summary ', () => {
//     let reviewSummaryInput = screen.getByPlaceholderText('Example: Best purchase ever!')
//     expect(reviewSummaryInput).toBeVisible();
//     expect(reviewSummaryInput).not.toHaveFocus();
//     return user.click((reviewSummaryInput))
//       .then(() => {
//         expect(reviewSummaryInput).toHaveFocus();
//         expect(reviewSummaryInput).toBeInvalid();
//         return user.keyboard('something init')
//       })
//       .then(() => {
//         expect(reviewSummaryInput).toHaveValue('something init');
//         expect(reviewForm).toHaveFormValues({reviewSummary: 'something init'});
//       })
//   });

//   it('should able to update and input in Review Body ', () => {
//     let reviewBodyInput = screen.getByPlaceholderText('Why did you like the product or not?')
//     expect(reviewBodyInput).toBeVisible();
//     expect(reviewBodyInput).not.toHaveFocus();
//     return user.click((reviewBodyInput))
//       .then(() => {
//         expect(reviewBodyInput).toHaveFocus();
//         expect(reviewBodyInput).toBeInvalid();
//         return user.keyboard('0123456789 ') //11 characters only
//       })
//       .then(() => {
//         expect(reviewBodyInput).toHaveValue('0123456789 ');
//         expect(screen.getByTestId('textBelowBodyInput')).toHaveTextContent("Minimum required characters left: 39");
//         expect(reviewForm).toHaveFormValues({reviewBody: '0123456789 '});
//         return user.keyboard('adding something else to this review Body to test that the text below this thing changes to Minimum Reached when we have more than enough characters') //more than 50 characters
//       })
//       .then(() => {
//         let reviewBodyCurrText = '0123456789 adding something else to this review Body to test that the text below this thing changes to Minimum Reached when we have more than enough characters';
//         expect(reviewBodyInput).toHaveValue(reviewBodyCurrText);
//         expect(screen.getByTestId('textBelowBodyInput')).toHaveTextContent("Minimum Reached");
//         expect(reviewForm).toHaveFormValues({reviewBody: reviewBodyCurrText});
//       })
//   });


//   it('should able to update and input in Nickname', () => {
//     let reviewNicknameInput = screen.getByPlaceholderText('Example: jackson11!')
//     expect(reviewNicknameInput).toBeVisible();
//     expect(reviewNicknameInput).not.toHaveFocus();
//     return user.click((reviewNicknameInput))
//       .then(() => {
//         expect(reviewNicknameInput).toHaveFocus();
//         expect(reviewNicknameInput).toBeInvalid();
//         return user.keyboard('some random nickname')
//       })
//       .then(() => {
//         expect(reviewNicknameInput).toHaveValue('some random nickname');
//         expect(reviewNicknameInput).toBeValid();
//         expect(reviewForm).toHaveFormValues({reviewNickname: 'some random nickname'});
//       })
//   });

//   it('should able to update and input in Email', () => {
//     let reviewEmailInput = screen.getByPlaceholderText('Example: jackson11@email.com')
//     expect(reviewEmailInput).toBeVisible();
//     expect(reviewEmailInput).not.toHaveFocus();
//     return user.click((reviewEmailInput))
//       .then(() => {
//         expect(reviewEmailInput).toHaveFocus();
//         return user.keyboard('someuser')
//       })
//       .then(() => {
//         expect(reviewEmailInput).toHaveValue('someuser');
//         expect(reviewEmailInput).toBeInvalid();  //invalid because there is no @
//         return user.keyboard('@gmail.com')
//       })
//       .then(() => {
//         expect(reviewEmailInput).toHaveValue('someuser@gmail.com');
//         expect(reviewEmailInput).toBeValid();
//         expect(reviewForm).toHaveFormValues({reviewEmail: 'someuser@gmail.com'});
//       })
//   });
// });