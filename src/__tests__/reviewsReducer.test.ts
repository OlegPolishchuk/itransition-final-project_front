import { paginationDefaultParams } from 'shared';
import { reviewsReducer, setReviewsPaginationParams } from 'store/reducers';
import {
  incrementComments,
  setReviewsSortType,
} from 'store/reducers/rewiewsReducer/reviewsSlice';
import { PaginationParams, Review, ReviewSortType, ReviewsState } from 'store/types';

let initialState: ReviewsState = {} as ReviewsState;

beforeEach(() => {
  initialState = {
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

describe('reviewsSlice actions', () => {
  it('setReviewPaginationParams should add correct sort params', () => {
    const paginationParams: PaginationParams = { page: 0, limit: 5 };

    const action = setReviewsPaginationParams(paginationParams);

    const endState = reviewsReducer(initialState, action);

    expect(endState.paginationParams.page).toBe(paginationParams.page);
    expect(endState.paginationParams.limit).toBe(paginationParams.limit);
  });

  it('setReviewsSortType should add correct sort type', () => {
    const sortType: ReviewSortType = 'overallScore';

    const action = setReviewsSortType(sortType);

    const endState = reviewsReducer(initialState, action);

    expect(initialState.sortType).toBe('created');
    expect(endState.sortType).toBe(sortType);
  });

  it('incrementComments should increment comments number in state by 1 in review', () => {
    const reviewId = '1';
    const startCommentsCount = 0;

    const review = {
      _id: '1',
      title: 'pfft',
      subtitle: 'candela',
      group: 'books',
      tags: ['games'],
      body: 'some text',
      comments: startCommentsCount,
      created: '2022-12-28T09:51:53.568Z',
      likes: 0,
      likesId: [],
      overallScore: 3,
      overallScoresId: [],
      personalScore: 0,
      updated: '2022-12-28T09:51:53.568Z',
      userAvatar: '',
      userId: '1',
      userLikes: 0,
      userName: 'test Name',
      __v: 0,
    };

    const getCurrentReview = (state: ReviewsState, reviewId: string): Review => {
      return state.reviews.filter(review => review._id === reviewId)[0];
    };

    initialState.reviews.push(review);

    const action = incrementComments(reviewId);

    const endState = reviewsReducer(initialState, action);

    expect(getCurrentReview(initialState, reviewId).comments).toBe(startCommentsCount);
    expect(getCurrentReview(endState, reviewId).comments).toBe(startCommentsCount + 1);
  });
});
