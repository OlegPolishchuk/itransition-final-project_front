import React, {ChangeEvent, FC, useState} from 'react';
import {Box, Button, FormControl, TextField} from "@mui/material";

type Props = {
  sendCommentCallback: (comment: string) => void;
}

export const CommentGenerator: FC<Props> = ({sendCommentCallback}) => {
  const [comment, setComment] = useState('');


  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  }

  const  handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      sendCommentCallback(comment)

      setComment('')
    }
  }

  const handleSendComment = () => {
    sendCommentCallback(comment)
    setComment('')
  }

  return (
    <Box>
      <FormControl sx={{width: '100%'}}>
        <TextField
          value={comment}
          placeholder="Set comment"
          variant={'outlined'}
          multiline
          minRows={5}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </FormControl>

      <Box mt={4} textAlign={'end'}>

        <Button
          variant='outlined'
          onClick={handleSendComment}
        >
          Send comment
        </Button>

      </Box>

    </Box>
  );
};
