import React, {FC, memo, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "hooks";
import {selectPaginationParams, selectReviewCount, selectReviews} from "store/selectors";
import {Box} from "@mui/material";
import {CustomPagination, ReviewHeader, ReviewList, Title} from "common";
import {FormattedMessage} from "react-intl";
import {Review} from "store/types/Review";
import {addCheckboxIntoObjectList} from "shared";
import {deleteReviews, fetchUserReviews} from "store/actions";
import {useSearchParams} from "react-router-dom";
import {setReviewsPaginationParams} from "store/reducers/rewiewsReducer/reviewsSlice";

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

    dispatch(deleteReviews({reviewsId, userId }))
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


  return (
    <Box sx={{marginTop: '50px'}}>

      <Title
        variant={'h4'}
        title={<FormattedMessage id='app.user.reviews.title'/>}
      />

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

    </Box>
  );
};
