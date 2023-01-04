import { paginationDefaultParams } from 'shared';
import { fetchReviews } from 'store/actions';
import { reviewsReducer } from 'store/reducers';
import { Review, ReviewsState } from 'store/types';

let startState: ReviewsState;

beforeEach(() => {
  startState = {
    tags: [],
    reviews: [],
    editableReview: null,
    reviewCount: 0,
    error: '',
    isLoading: true,
    isFirstLoading: true,
    paginationParams: {
      page: paginationDefaultParams.page,
      limit: paginationDefaultParams.limit,
    },
    sortType: 'created',
    uploadedImgSrc: '',
    isCreatedNewOne: false,
  };
});

describe('fetchReviews thunk', () => {
  it('should fetchReviews with resolved response', async () => {
    const reviews: Review[] = [{} as Review, {} as Review];
    const action = fetchReviews.fulfilled(
      { totalCount: reviews.length, reviews },
      'created',
      {
        reviewsSortParams: 'created',
        reviewId: '',
      },
    );

    const endState = reviewsReducer(startState, action);

    expect(endState.reviewCount).toBe(reviews.length);
    expect(endState.reviews.length).toBe(reviews.length);
  });

  it('should fetchReviews with rejected response', async () => {
    const errorMessage = 'Request failed with status code 500';

    const action = fetchReviews.rejected(
      { message: errorMessage, name: 'error' },
      'created',
      {
        reviewsSortParams: 'created',
        reviewId: '',
      },
    );

    const endState = reviewsReducer(startState, action);

    expect(endState.isLoading).toBe(false);
    expect(endState.reviews.length).toBe(startState.reviews.length);
  });
});
