import React, { memo, ReactElement } from 'react';

import { Pagination } from '@mui/material';

type Props = {
  totalCount: number;
  page: number;
  onChangeCallback: (page: number) => void;
  limitPerPage: number;
};

export const CustomPagination = memo(
  ({ page, onChangeCallback, totalCount, limitPerPage }: Props): ReactElement => {
    const totalPageCount = Math.ceil(totalCount / limitPerPage);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number): void => {
      onChangeCallback(value - 1);
    };

    return (
      <Pagination
        variant="outlined"
        shape="rounded"
        color="secondary"
        count={totalPageCount}
        page={page + 1}
        onChange={handleChangePage}
      />
    );
  },
);
