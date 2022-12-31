import React, { ChangeEvent, FC, useRef, useState } from 'react';

import { Box, Button, FormControl, TextField } from '@mui/material';
import { FormattedMessage } from 'react-intl';

type Props = {
  sendCommentCallback: (comment: string) => void;
};

export const CommentGenerator: FC<Props> = ({ sendCommentCallback }) => {
  const [comment, setComment] = useState('');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      sendCommentCallback(comment);

      textAreaRef.current!.blur();

      setComment('');
    }
  };

  const handleSendComment = (): void => {
    sendCommentCallback(comment);
    setComment('');
  };

  return (
    <Box>
      <FormControl sx={{ width: '100%' }}>
        <TextField
          value={comment}
          placeholder="Set comment"
          variant="outlined"
          multiline
          minRows={5}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          inputRef={textAreaRef}
        />
      </FormControl>

      <Box mt={4} textAlign="end">
        <Button variant="outlined" onClick={handleSendComment}>
          <FormattedMessage id="app.comment.button-send.title" />
        </Button>
      </Box>
    </Box>
  );
};
