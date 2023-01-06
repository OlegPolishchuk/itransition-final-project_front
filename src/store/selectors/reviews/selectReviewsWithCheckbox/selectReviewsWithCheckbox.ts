import { createSelector } from '@reduxjs/toolkit';

import { selectReviews } from 'store/selectors/reviews/selectReviews/selectReviews';

export const selectReviewsWithCheckbox = createSelector(selectReviews, reviews => {
  return reviews.map(review => ({ ...review, checked: false }));
});
