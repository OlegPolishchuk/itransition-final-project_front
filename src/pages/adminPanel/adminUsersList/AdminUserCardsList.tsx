import React, { FC, useEffect, useState } from 'react';

import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Checkbox,
  Grid,
  Typography,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { CustomPagination, MainCheckbox } from 'common';
import { useThemeColors } from 'hooks';
import { addCheckboxIntoObjectList, routes, userRoles, userStatus } from 'shared';
import { User } from 'store/types/User/User';

type Props = {
  users: User[];
  cardListSelection: string[];
  setCardListSelection: (newValues: string[]) => void;
  mainCheckboxChecked: boolean;
  setMainCheckboxChecked: (mainCheckboxChecked: boolean) => void;
  totalCount: number;
  page: number;
  onChangeCallback: (page: number) => void;
  limitPerPage: number;
};

export const AdminUserCardsList: FC<Props> = ({
  users,
  cardListSelection,
  setCardListSelection,
  mainCheckboxChecked,
  setMainCheckboxChecked,
  totalCount,
  page,
  onChangeCallback,
  limitPerPage,
}) => {
  const [usersWithCheckbox, setUsersWithCheckbox] = useState<
    (User & { checked: boolean })[]
  >(addCheckboxIntoObjectList(users));

  const themeColors = useThemeColors();

  const handleChangeMainCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { checked } = event.target;

    if (checked) {
      const idList = users
        .filter(user => user.role !== userRoles.admin)
        .map(user => user._id);

      setCardListSelection(idList);
    } else {
      setCardListSelection([]);
    }

    setUsersWithCheckbox(usersWithCheckbox =>
      usersWithCheckbox.map(user => ({
        ...user,
        checked: event.target.checked,
      })),
    );

    setMainCheckboxChecked(event.target.checked);
  };

  const handleChangeCurrentCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ): void => {
    const { checked } = event.target;

    if (checked) {
      setCardListSelection([...cardListSelection, id]);
    } else {
      const filteredCheckboxes = cardListSelection.filter(card => card !== id);

      setCardListSelection(filteredCheckboxes);
    }

    setUsersWithCheckbox(usersWithCheckbox =>
      usersWithCheckbox.map(user => (user._id === id ? { ...user, checked } : user)),
    );
  };

  useEffect(() => {
    setUsersWithCheckbox(addCheckboxIntoObjectList(users));
  }, [users]);

  useEffect(() => {
    if (users.length === 0 && page > 0) {
      onChangeCallback(page - 1);
    }
  }, [users]);

  return (
    <Grid container spacing={2} rowSpacing={3}>
      <Grid item xs={12} sm={12}>
        <MainCheckbox
          checked={mainCheckboxChecked}
          changeCallback={handleChangeMainCheckbox}
          label={<FormattedMessage id="app.admin.card-list.main-checkbox.title" />}
        />
      </Grid>

      {usersWithCheckbox.map(user => {
        return (
          <Grid key={user._id} item xs={12} sm={6}>
            <Card>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                padding="0 0 0 16px"
              >
                <Box>
                  {user.status === userStatus.blocked ? (
                    <BlockOutlinedIcon color="warning" />
                  ) : (
                    <VerifiedUserOutlinedIcon color="secondary" />
                  )}
                </Box>

                <Typography variant="h5">{user._id}</Typography>

                {user.role !== userRoles.admin && (
                  <Checkbox
                    checked={user.checked}
                    disabled={user.role === userRoles.admin}
                    onChange={e => handleChangeCurrentCheckbox(e, user._id)}
                    color="secondary"
                  />
                )}
              </Box>

              <CardHeader
                avatar={<Avatar src={user.avatar} aria-label="recipe" />}
                title={<Typography>{user.login}</Typography>}
                subheader={<Typography>{user.userName}</Typography>}
              />

              <CardActions
                sx={{
                  justifyContent: 'center',
                  '& .navLink': {
                    color: themeColors.secondary.main,
                  },
                }}
              >
                <Box textAlign="center">
                  <Button variant="outlined" color="secondary">
                    <NavLink className="navLink" to={`${routes.admin.user}/${user._id}`}>
                      <FormattedMessage id="app.user.card-list.link-info.title" />
                    </NavLink>
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        );
      })}

      <Grid item xs={12} sm={12}>
        <Box display="flex" justifyContent="center">
          <CustomPagination
            totalCount={totalCount}
            page={page}
            onChangeCallback={onChangeCallback}
            limitPerPage={limitPerPage}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
