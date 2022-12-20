import React, {FC, useEffect, useRef, useState} from 'react';
import {Box, Button, ButtonGroup, Grid} from "@mui/material";
import {User} from "store/types/User/User";
import {useAppDispatch, useAppSelector} from "hooks";
import {UserAvatar} from "common/users/userInfo/userAvatar/UserAvatar";
import {UserDescription} from "common/users/userInfo/userDescription/UserDescription";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import {FormattedMessage} from "react-intl";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {updateCurrentUser} from "store/actions/admin/updateCurrentUser";
import {AdminUserHeader} from "pages";
import {selectUserRole} from "store/selectors";

type Props = {
  user: User;
  isMyProfile: boolean;
}

export const UserInfo: FC<Props> = ({user, isMyProfile}) => {
  const dispatch = useAppDispatch();

  const userRole = useAppSelector(selectUserRole);

  const [editMode, setEditMode] = useState(false);
  const [userCopy, setUserCopy] = useState<{ [key: string]: any }>({...user});

  const userNameRef = useRef<HTMLInputElement>(null);
  console.log(isMyProfile)

  const handleSaveUserDescription = () => {
    const usernameInput = userNameRef.current as HTMLInputElement;
    const username = usernameInput.value.length
      ? usernameInput.value
      : userCopy.userName;

    setEditMode(false);

    const userData = {
      ...userCopy,
      userName: username,
    }

    dispatch(updateCurrentUser(userData))
  }

  const handleCancelEditing = () => {
    setUserCopy({...user});
    setEditMode(false);
  }


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') { handleSaveUserDescription() }
      if (event.key === 'Escape') { handleCancelEditing() }
    }

    if (editMode) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => window.removeEventListener('keydown', handleKeyDown)

  }, [editMode])


  useEffect(() => {
    setUserCopy({...user})
  }, [user])

  return (
    <Grid container rowSpacing={8} sx={{
      display: 'flex',
    }}>

      {userRole === 'admin' && (
        <Grid item xs={12} sm={12}>
          <AdminUserHeader user={userCopy}/>
        </Grid>
      )}

      <Grid item xs={12} sm={4} md={3}>
        <UserAvatar
          avatarSrc={user.avatar}
          editAvatarCallback={() => {}}
          isMyProfile={isMyProfile}
        />
      </Grid>


      <Grid item xs={12} sm={8} md={9} sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
      }}>

        <UserDescription
          user={user}
          editMode={editMode}
          userCopy={userCopy}
          setUserCopy={setUserCopy}
          ref={userNameRef}
        />

        <Box alignSelf={'flex-end'}>

          {isMyProfile && (
            <>
              {editMode
                ? (

                  <Box sx={{display: 'flex'}}>

                    <ButtonGroup>
                      <Button
                        sx={{minWidth: '100px'}}
                        variant='outlined'
                        color={'secondary'}
                        endIcon={<SaveAsOutlinedIcon/>}
                        onClick={handleSaveUserDescription}
                      >
                        <FormattedMessage id='app.user.info.button-save.title'/>
                      </Button>

                      <Button
                        sx={{minWidth: '100px'}}
                        variant='outlined'
                        color={'success'}
                        endIcon={<CancelOutlinedIcon/>}
                        onClick={handleCancelEditing}
                      >
                        <FormattedMessage id={'app.user.info.button-cancel.title'}/>
                      </Button>
                    </ButtonGroup>

                  </Box>
                )
                : (
                  <Button
                    sx={{width: '200px'}}
                    variant='outlined'
                    endIcon={<EditOutlinedIcon/>}
                    onClick={() => setEditMode(true)}
                  >
                    <FormattedMessage id='app.user.info.button-edit.title'/>
                  </Button>)
              }
            </>
          )}

        </Box>

      </Grid>

    </Grid>
  );
};
