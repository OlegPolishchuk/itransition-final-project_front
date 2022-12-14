import React, {FC, useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {NothingToShow, CustomPagination, ReviewList, ReviewHeader} from "common";
import {FormattedMessage} from "react-intl";
import {Review} from "store/types";
import {useAppDispatch, useAppSelector} from "hooks";
import {selectPaginationParams, selectReviewCount, selectReviews} from "store/selectors";
import {addCheckboxIntoObjectList} from "shared";
import {deleteReviews, fetchUserReviews} from "store/actions";
import {setReviewsPaginationParams} from "store/reducers";
import {useSearchParams} from "react-router-dom";

type Props = {
  userId: string;
}

export const UserReviews: FC<Props> = ({userId}) => {
  const dispatch = useAppDispatch();

  const reviews = useAppSelector(selectReviews);
  const totalCount = useAppSelector(selectReviewCount);

  const {page, limit} = useAppSelector(selectPaginationParams);

  const [mainCheckbox, setMainCheckbox] = useState(false);
  const [reviewsWithCheckbox, setReviewsWithCheckbox] =
    useState<(Review & { checked: boolean })[]>(addCheckboxIntoObjectList(reviews));

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page')) || page;
  const limitParam = Number(searchParams.get('limit')) || limit;

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


  useEffect(() => {
    if (userId) {
      dispatch(fetchUserReviews(userId))
    }
  }, [page, limit, userId])


  useEffect(() => {
    if (reviews.length === 0 && page > 0) {
      handleChangePage(page - 1)
    }
  }, [reviews])


  return (
    <>
      {totalCount
        ? (
          <>
            <Box mt={'30px'}>
              <ReviewHeader
                isMainCheckboxChecked={mainCheckbox}
                handleChangeMainCheckbox={handleChangeMainCheckbox}
                deleteCallback={handleDelete}
              />
            </Box>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginTop: '30px',
            }}>

              <ReviewList
                reviews={reviews}
                reviewsWithCheckbox={reviewsWithCheckbox}
                setReviewsWithCheckbox={setReviewsWithCheckbox}
                pageNumber={page}
              />

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
