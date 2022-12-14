import React, {FC} from 'react';
import {Pagination} from "@mui/material";

type Props = {
  totalCount: number;
  page: number;
  onChangeCallback: (page: number) => void;
  limitPerPage: number;
}

export const CustomPagination: FC<Props> = ({page, onChangeCallback, totalCount, limitPerPage}) => {
  const totalPageCount = Math.ceil(totalCount / limitPerPage);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    onChangeCallback(value - 1);
  }

  return (
    <Pagination
      variant="outlined"
      shape="rounded"
      color='secondary'
      count={totalPageCount}
      page={page + 1}
      onChange={handleChangePage}
    />
  );
};
