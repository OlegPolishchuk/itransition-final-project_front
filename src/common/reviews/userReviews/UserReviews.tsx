import React, {FC, useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {
  CustomPagination, Loader,
  NothingToShow,
  ReviewHeader,
  ReviewList,
  ReviewsSorting
} from "common/index";
import {FormattedMessage} from "react-intl";
import {Review} from "store/types";
import {useAppDispatch, useAppSelector} from "hooks";
import {
  selectIsReviewLoading,
  selectPaginationParams,
  selectReviewCount,
  selectReviews
} from "store/selectors";
import {addCheckboxIntoObjectList} from "shared";
import {deleteReviews, fetchUserReviews} from "store/actions";
import {setReviewsPaginationParams} from "store/reducers";
import {useSearchParams} from "react-router-dom";
import {selectReviewsSortType} from "store/selectors/reviews";
import {setReviewsSortType} from "store/reducers/rewiewsReducer/reviewsSlice";

type Props = {
  userId: string;
  isMyProfile: boolean;
}

export const UserReviews: FC<Props> = ({userId, isMyProfile}) => {
  const dispatch = useAppDispatch();

  const reviews = useAppSelector(selectReviews);
  const totalCount = useAppSelector(selectReviewCount);
  const {page, limit} = useAppSelector(selectPaginationParams);
  const reviewsSortType = useAppSelector(selectReviewsSortType);
  const isLoading = useAppSelector(selectIsReviewLoading);

  const [mainCheckbox, setMainCheckbox] = useState(false);
  const [reviewsWithCheckbox, setReviewsWithCheckbox] =
    useState<(Review & { checked: boolean })[]>(addCheckboxIntoObjectList(reviews));

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page')) || page;
  const limitParam = Number(searchParams.get('limit')) || limit;

  const disabledDeleteButton = reviewsWithCheckbox.filter(review => review.checked).length === 0;


  const handleChangeMainCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    setReviewsWithCheckbox(reviewsWithCheckbox.map(review => ({
      ...review,
      checked,
    })))

    setMainCheckbox(checked);
  }

  const handleDelete = () => {
    const reviewsId = reviewsWithCheckbox
      .filter(review => review.checked)
      .map(review => review._id);

    dispatch(deleteReviews({reviewsId, userId}));
    setMainCheckbox(false);
  }

  const handleChangePage = (page: number) => {
    dispatch(setReviewsPaginationParams({page}))

    searchParams.set('page', `${page}`)
    setSearchParams(searchParams);
  }

  const handleChangeReviewsSortParams = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setReviewsSortType((event.target as HTMLInputElement).value))
  }


  useEffect(() => {
    if (userId) {
      dispatch(fetchUserReviews(userId))
    }
  }, [page, limit, userId, reviewsSortType])


  useEffect(() => {
    if (reviews.length === 0 && page > 0) {
      handleChangePage(page - 1)
    }
  }, [reviews])


  return (
    <>

      <ReviewsSorting
        value={reviewsSortType}
        onChangeCallback={handleChangeReviewsSortParams}
      />

      {totalCount
        ? (
          <>
            {isMyProfile && (
              <Box mt={'30px'}>
                <ReviewHeader
                  isMainCheckboxChecked={mainCheckbox}
                  handleChangeMainCheckbox={handleChangeMainCheckbox}
                  deleteCallback={handleDelete}
                  disabled={disabledDeleteButton}
                />
              </Box>
            )}

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginTop: '30px',
            }}>

              {isLoading
              ? <Loader />
              : (
                  <ReviewList
                    reviews={reviews}
                    reviewsWithCheckbox={reviewsWithCheckbox}
                    setReviewsWithCheckbox={setReviewsWithCheckbox}
                    pageNumber={page}
                  />
                )
              }

            </Box>

            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '30px'
            }}>
              <CustomPagination
                totalCount={totalCount}
                page={pageParam}
                onChangeCallback={handleChangePage}
                limitPerPage={limitParam}
              />
            </Box>
          </>
        )
        : (
          <NothingToShow
            title={<FormattedMessage id='app.user.reviews-list.no-values.title'/>}
          />
        )
      }
    </>
  );
};
