import React, {
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

import {
  AddNewReviewButton,
  CustomDialog,
  CustomPagination,
  DeleteReviewsDialogText,
  Loader,
  NothingToShow,
  ReviewHeader,
  ReviewList,
  ReviewsSorting,
} from 'common/index';
import { useAppDispatch, useAppSelector } from 'hooks';
import { deleteReviews, fetchUserReviews } from 'store/actions';
import { setReviewsPaginationParams } from 'store/reducers';
import { setReviewsSortType } from 'store/reducers/rewiewsReducer/reviewsSlice';
import {
  selectIsReviewLoading,
  selectPaginationParamsLimit,
  selectReviewCount,
  selectReviewsWithCheckbox,
} from 'store/selectors';
import {
  selectPaginationParamsPage,
  selectReviewsSortType,
} from 'store/selectors/reviews';
import { ReviewSortType } from 'store/types';

type Props = {
  userId: string;
  isMyProfile: boolean;
};

export const UserReviews = memo(({ userId, isMyProfile }: Props): ReactElement => {
  const dispatch = useAppDispatch();

  const reviews = useAppSelector(selectReviewsWithCheckbox);
  const totalCount = useAppSelector(selectReviewCount);
  const page = useAppSelector(selectPaginationParamsPage);
  const limit = useAppSelector(selectPaginationParamsLimit);
  const reviewsSortType = useAppSelector(selectReviewsSortType);
  const isLoading = useAppSelector(selectIsReviewLoading);

  const [mainCheckbox, setMainCheckbox] = useState(false);
  const [reviewsWithCheckbox, setReviewsWithCheckbox] = useState(reviews);
  const [modalOpen, setModalOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page')) || page;
  const limitParam = Number(searchParams.get('limit')) || limit;

  const handleModalOpen = (): void => {
    setModalOpen(true);
  };

  const handleModalsClose = (): void => {
    setModalOpen(false);
  };

  const disabledDeleteButton = useMemo(() => {
    return reviewsWithCheckbox.filter(review => review.checked).length === 0;
  }, [reviewsWithCheckbox]);

  const handleChangeMainCheckbox = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { checked } = event.target;

      setReviewsWithCheckbox(
        reviewsWithCheckbox.map(review => ({
          ...review,
          checked,
        })),
      );

      setMainCheckbox(checked);
    },
    [reviewsWithCheckbox],
  );

  const getReviewsToDelete = (): string[] => {
    return reviewsWithCheckbox.filter(review => review.checked).map(review => review._id);
  };

  const handleDelete = useCallback((): void => {
    const reviewsId = getReviewsToDelete();

    dispatch(deleteReviews({ reviewsId, userId }));

    setMainCheckbox(false);
    setModalOpen(false);
  }, [reviewsWithCheckbox, userId]);

  const handleChangePage = useCallback((page: number): void => {
    dispatch(setReviewsPaginationParams({ page, limit }));

    searchParams.set('page', `${page}`);
    setSearchParams(searchParams);
  }, []);

  const handleChangeReviewsSortParams = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = event.target as HTMLInputElement;

      dispatch(setReviewsSortType(value as ReviewSortType));
    },
    [],
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserReviews(userId));
    }
  }, [page, limit, userId, reviewsSortType]);

  useEffect(() => {
    if (reviews.length === 0 && page > 0) {
      handleChangePage(page - 1);
    }
  }, [reviews]);

  return (
    <>
      <ReviewsSorting
        value={reviewsSortType}
        onChangeCallback={handleChangeReviewsSortParams}
      />

      {totalCount ? (
        <>
          {isMyProfile && (
            <>
              <Box textAlign="end">
                <AddNewReviewButton />
              </Box>

              <Box mt="30px">
                <ReviewHeader
                  isMainCheckboxChecked={mainCheckbox}
                  handleChangeMainCheckbox={handleChangeMainCheckbox}
                  deleteCallback={handleModalOpen}
                  disabled={disabledDeleteButton}
                />
              </Box>
            </>
          )}

          <Box sx={style.reviewsListWrapper}>
            {isLoading ? (
              <Loader />
            ) : (
              <ReviewList
                reviews={reviews}
                reviewsWithCheckbox={reviewsWithCheckbox}
                setReviewsWithCheckbox={setReviewsWithCheckbox}
                pageNumber={page}
              />
            )}
          </Box>

          <Box sx={style.paginationWrapper}>
            <CustomPagination
              totalCount={totalCount}
              page={pageParam}
              onChangeCallback={handleChangePage}
              limitPerPage={limitParam}
            />
          </Box>
        </>
      ) : (
        <>
          <Box textAlign="end">
            <AddNewReviewButton />
          </Box>

          <NothingToShow
            title={<FormattedMessage id="app.user.reviews-list.no-values.title" />}
          />
        </>
      )}

      <CustomDialog
        open={modalOpen}
        acceptCallback={handleDelete}
        canselCallback={handleModalsClose}
      >
        <DeleteReviewsDialogText deleteReviews={getReviewsToDelete()} />
      </CustomDialog>
    </>
  );
});

const style = {
  reviewsListWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '30px',
  },

  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
};
