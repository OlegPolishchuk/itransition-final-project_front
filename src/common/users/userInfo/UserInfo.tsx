import React, {FC, useState} from 'react';
import {Avatar, Box, Button, Grid, Typography} from "@mui/material";
import {User} from "store/types/User";
import {useAppDispatch, useThemeColors} from "hooks";
import {UserAvatar} from "common/users/userInfo/userAvatar/UserAvatar";
import {UserDescription} from "common/users/userInfo/userDescription/UserDescription";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import {FormattedMessage} from "react-intl";

type Props = {
  user: User;
}

export const UserInfo: FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);

  const handleSaveUserDescription = () => {

    setEditMode(false);
  }

  return (
    <Grid container  rowSpacing={8} sx={{
      display: 'flex',
    }}>

      <Grid item xs={12} sm={4} md={3}>
        <UserAvatar
          avatarSrc={user.avatar}
          editAvatarCallback={() => {
          }}
        />
      </Grid>


      <Grid item xs={12} sm={8} md={9} sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
      }}>

        <UserDescription user={user}/>

        <Box alignSelf={'flex-end'}>
          {editMode
            ? (
              <Button
                sx={{width: '200px'}}
                variant='outlined'
                endIcon={<SaveAsOutlinedIcon />}
                onClick={handleSaveUserDescription}
              >
                <FormattedMessage id='app.user.info.button-save.title' />
              </Button>
            )
            : (
              <Button
                sx={{width: '200px'}}
                variant='outlined'
                endIcon={<EditOutlinedIcon />}
                onClick={() => setEditMode(true)}
              >
                <FormattedMessage id='app.user.info.button-edit.title' />
              </Button>)
          }
        </Box>

      </Grid>

    </Grid>
  );
};
