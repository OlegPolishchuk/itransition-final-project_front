import React, { ReactElement } from 'react';

import { Pagination } from '@mui/material';
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';

export const DataGridCustomPagination = (): ReactElement => {
  const apiRef = useGridApiContext();

  const page = useGridSelector(apiRef, gridPageSelector);
  const totalPageCount = useGridSelector(apiRef, gridPageCountSelector);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number): void => {
    apiRef.current.setPage(value - 1);
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
};
