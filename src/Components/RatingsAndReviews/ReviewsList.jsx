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
    /* width: 100%; */
  `;

  const DesignButtons = styled.button`
    height: 40px;
    width: 20%;
    border: none;
    background-color: #4f0b40;
    color: white;
    border: 1.5px solid black;
    margin: 8px 2px;

    &:hover {
      background-color: #800f67;
      cursor: pointer;
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
