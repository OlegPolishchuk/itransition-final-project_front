import React, {FC, useEffect, useState} from 'react';
import {User} from "store/types/User";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography
} from "@mui/material";
import {addCheckboxToUser, userRoles} from "shared";

type Props = {
  users: User[];
  cardListSelection: string[];
  setCardListSelection: (newValues: string[]) => void;
  mainCheckboxChecked: boolean;
  setMainCheckboxChecked: (mainCheckboxChecked: boolean) => void;
}

export const AdminUserCardsList: FC<Props> = ({
                                                users,
                                                cardListSelection,
                                                setCardListSelection,
                                                mainCheckboxChecked,
                                                setMainCheckboxChecked
                                              }) => {

  const [usersWithCheckbox, setUsersWithCheckbox] = useState(addCheckboxToUser(users))

  const handleChangeMainCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    if (checked) {
      const idList = users
        .filter(user => user.role !== userRoles.admin)
        .map(user => user._id);

      setCardListSelection(idList)
    } else {
      setCardListSelection([]);
    }

    setUsersWithCheckbox(usersWithCheckbox => (usersWithCheckbox.map(user => ({
      ...user,
      checked: event.target.checked,
    }))))

    setMainCheckboxChecked(event.target.checked);
  }

  const handleChangeCurrentCheckbox = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const checked = event.target.checked;

    if (checked) {
      setCardListSelection([...cardListSelection, id])
    } else {
      const filteredCheckboxes = cardListSelection.filter(card => card !== id);

      setCardListSelection(filteredCheckboxes);
    }

    setUsersWithCheckbox(usersWithCheckbox => (usersWithCheckbox.map(user => (
      user._id === id ? {...user, checked} : user
    ))))
  }

  useEffect(() => {
    setUsersWithCheckbox(addCheckboxToUser(users))
  }, [users])

  return (
    <Grid container spacing={2} rowSpacing={3}>

      <Grid item xs={12} sm={12}>
        <FormControlLabel
          label="Choose All"
          control={<Checkbox checked={mainCheckboxChecked} onChange={handleChangeMainCheckbox}/>}
        />
      </Grid>

      {usersWithCheckbox.map(user => {
        return (
          <Grid key={user._id} item xs={12} sm={6}>

            <Card>

              {user.role !== userRoles.admin && (
                <Box display={'flex'} justifyContent={'flex-end'}>
                  <Checkbox
                    checked={user.checked}
                    disabled={user.role === userRoles.admin}
                    onChange={(e) => handleChangeCurrentCheckbox(e, user._id)}
                    color="secondary"
                  />
                </Box>
              )}

              <CardHeader
                avatar={<Avatar src={user.avatar} aria-label="recipe"/>}
                title={<Typography>{user.login}</Typography>}
                subheader={<Typography>{user.userName}</Typography>}
              />
            </Card>

          </Grid>
        )
      })}

    </Grid>
  );
};
