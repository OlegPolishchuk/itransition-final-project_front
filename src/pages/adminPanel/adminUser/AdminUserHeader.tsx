import React, {FC} from 'react';
import {Box, Button, Tooltip} from "@mui/material";
import {userStatus} from "shared";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {updateCurrentUser} from "store/actions/users/updateCurrentUser";
import {deleteCurrentUser} from "store/actions/users";
import {useAppDispatch} from "hooks";
import {useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";

type Props = {
  user: { [key: string]: any } ;
}

export const AdminUserHeader: FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleUpdateUserStatus = (status: string) => {
    const updatedUser = {
      ...user,
      status,
    }

    dispatch(updateCurrentUser(updatedUser))
  }

  const handleDeleteUser = () => {
    dispatch(deleteCurrentUser(user._id))

    navigate(-1)
  }

  return (
    <Box className={'admin-user-header'}>

      <Box className={'admin-user-header-status'}>
        {user.status === userStatus.blocked
          ? (
            <Tooltip
              title={<FormattedMessage id={'app.user.info.tooltip-status-blocked'}/>}
              placement={'top'}
            >
              <BlockOutlinedIcon color={'warning'} />
            </Tooltip>
          )
          : (
            <Tooltip
              title={<FormattedMessage id={'app.user.info.tooltip-status-active'}/>}
              placement={'top'}
            >
              <VerifiedUserOutlinedIcon color={'secondary'} />
            </Tooltip>
          )
        }
      </Box>

      <Box className={'admin-user-header-status-buttonGroup'}>
        <Button
          variant={'outlined'}
          endIcon={<BlockOutlinedIcon color={'warning'}/>}
          onClick={() => handleUpdateUserStatus(userStatus.blocked)}
          disabled={user.status === userStatus.blocked}
        >
          <FormattedMessage id={'app.user.info.button-block.title'} />
        </Button>

        <Button
          variant={'outlined'}
          endIcon={<VerifiedUserOutlinedIcon color={'info'}/>}
          onClick={() => handleUpdateUserStatus(userStatus.active)}
          disabled={user.status === userStatus.active}
        >
          <FormattedMessage id={'app.user.info.button-unblock.title'} />
        </Button>

        <Button
          variant={'outlined'}
          endIcon={<DeleteOutlineOutlinedIcon color={'error'}/>}
          onClick={handleDeleteUser}
        >
          <FormattedMessage id={'app.user.info.button-delete.title'} />
        </Button>

      </Box>

    </Box>
  );
};
