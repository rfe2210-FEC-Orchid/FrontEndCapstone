import React from 'react';


const ReviewTile = () => {

  return (
    <div>Some Review</div>
  )
};

export default ReviewTile;

//1. Star Rating
  //solid or outlined starts
  // 5 stars should always appear
  //render by quarter

//2. Date of review in "Month DD, YYYY"

//3. Review Summary:
  //one sentence cummary, capped at 60 characters
  //summary in Bold


//4. Review Body
  //text or image
  //text: 50 - 1000 characters
    //default first 250 characters will show
    //"Show More" button more than 250 characters
  //up to 5 images
    //image appear as thumbnails
    //click image opens modal

//5. Recommend
  //if reviewer recommends
    //"i recommend this product"  AND checkmark icon will show

//6. Reviewer name
  //username will appear
  //if user email associated with sale, text "Verified Purchases" will appear

//7. Response to Review
  //Response below the review
  //reponse preceded by "Response from seller"

//8. Rating Helpfullness
  //Yes and No buttons
    //both buttons should have counts
  //user doesnt have to be logged in
  //can only choose yes OR no

