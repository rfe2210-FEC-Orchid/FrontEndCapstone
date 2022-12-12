import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import styled from 'styled-components';

const ReviewsList = ({reviews, reviewCount, renderCount, handleMoreReviews, renderList, handleBarFilter, handleSortBy, sortBy, setIsWritingReview, handleTrack}) => {
  // const bottomRef = useRef(null);

  const FilterButton = styled.button`
    cursor: pointer;
  `;

  const HeaderContainer = styled.div`
    font-weight: bold;
    margin: 20px 0px;
    font-size: 18px;
  `;

  const SortByButton = styled.select`
    border: 0;
    border-bottom: 1px solid black;
    cursor: pointer;
  `;

  const ReviewListContainer = styled.div`
    overflow-y: auto;
    height: 450px;
    /* max-height: 450px; */
    width: 65%;
  `;

  const DesignButtons = styled.button`
    align-items: center;
    margin: 10px 0px;
    border: 2px solid #111;
    border-radius: 8px;
    box-sizing: border-box;
    color: #111;
    cursor: pointer;
    /* display: flex; */
    font-family: Inter,sans-serif;
    font-size: 14px;
    height: 30px;
    justify-content: center;
    line-height: 18px;
    max-width: 100%;
    padding: 0 15px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    :after {
      background-color: #111;
      border-radius: 8px;
      content: "";
      display: block;
      height: 30px;
      left: 0;
      width: 100%;
      position: absolute;
      top: -2px;
      transform: translate(8px, 8px);
      transition: transform .2s ease-out;
      z-index: -1;
    }

    :hover:after {
      transform: translate(0, 0);
    }

    :active {
      background-color:#800F67;
      color: white;
      outline: 0;
    }

    :hover {
      outline: 0;
      background-color:#800F67;
      color: white;
    }

    @media (min-width: 768px) {
      .button-56 {
        padding: 0 40px;
      }
    }
  `;



  // useEffect(() => {
  //   // 👇️ scroll to bottom every time messages change
  //   bottomRef.current?.scrollIntoView({behavior: "smooth", block: "start"});
  // }, [renderCount]);

  return (
    <div>
      {/* <div>For dev: Review Count {reviewCount}</div>
      <div>For dev: Render Count {renderCount}</div> */}
      <HeaderContainer>
        <span>{reviewCount +" reviews, sorted by "}</span>
        <SortByButton name="sortBy" value={sortBy} onChange={(evt) =>{
          handleSortBy(evt.target.value);
        }}>
          <option value="relevance">relevance</option>
          <option value="newest">newest</option>
          <option value="helpful">helpfulness</option>
        </SortByButton>
      </HeaderContainer>
      {renderList.map((num) => <FilterButton onClick={(evt) => {
        evt.preventDefault();
        handleBarFilter(num);
      }}><span>{num + " stars "}</span><span>✖</span></FilterButton> )}
      {renderList.length > 0 &&
        <FilterButton onClick={(evt) => {
          evt.preventDefault();
          handleBarFilter([]);
        }}>
          <span>Remove all filters </span>
          <span>✖</span>
        </FilterButton>}
      <ReviewListContainer >
        {reviews.slice(0, renderCount).map((review) => <ReviewTile key={review.review_id} review={review}/>)}
        {/* <div ref={bottomRef}></div> */}
      </ReviewListContainer >
      {(reviewCount > renderCount) && (reviewCount > 2) ? <DesignButtons data-name="more-reviews" onClick={handleMoreReviews}>More Reviews</DesignButtons> : null}
      <DesignButtons data-name="add-review" onClick={(evt) => {
        handleTrack(evt, "reviewNratings");
        setIsWritingReview(true)}}>Add a Review ➕</DesignButtons>
    </div>
  )
}

export default ReviewsList;
