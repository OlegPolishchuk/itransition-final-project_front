import React, {FC} from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import {DataGridCustomPagination} from "common";
import {useAppSelector} from "hooks";
import {selectThemeMode} from "store/selectors";
import {FormattedMessage} from "react-intl";

type Props = {
  rowsPerPageOptions: number[];
  changePageSizeCallback: (pageSize: number) => void;
  pageSize: number;
}

export const AdminDataGridFooter: FC<Props> = ({
                                                 changePageSizeCallback,
                                                 pageSize,
                                                 rowsPerPageOptions
                                               }) => {
  const theme = useAppSelector(selectThemeMode);

  const handlePageSizeOptionChange = (event: SelectChangeEvent) => {
    const pageValue = Number(event.target.value);

    changePageSizeCallback(pageValue)
  }

  return (
    <Box sx={{
      padding: '10px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderTop: '1px solid',
      borderColor: theme === 'dark' ? 'rgba(81, 81, 81, 1)' : 'rgba(224, 224, 224, 1)' ,
    }}>

      <DataGridCustomPagination/>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: '30px',
      }}>

        <Typography>
          <FormattedMessage id='app.admin.table-footer.rowsPerPage.title'/>
        </Typography>

        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
          <Select
            sx={{maxWidth: '70px'}}
            value={`${pageSize}`}
            onChange={handlePageSizeOptionChange}
          >
            {rowsPerPageOptions.map((option, index) => (
              <MenuItem
                key={`${option}${index}`}
                value={option}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

    </Box>
  );
};
