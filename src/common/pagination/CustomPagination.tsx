import React, {FC} from 'react';
import {Pagination} from "@mui/material";

export type Props = {
  totalCount: number;
  page: number;
  onChangeCallback: (page: number) => void;
  limitPerPage: number;
}

export const CustomPagination: FC<Props> = ({page, onChangeCallback, totalCount, limitPerPage}) => {
  const totalPageCount = Math.ceil(totalCount / limitPerPage);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    onChangeCallback(value);
  }

  return (
    <Pagination
      count={totalPageCount}
      page={page}
      variant="outlined"
      shape="rounded"
      onChange={handleChangePage}
    />
  );
};
