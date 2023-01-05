import React, { memo, ReactElement } from 'react';

import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPG', 'PNG', 'GIF'];

type Props = {
  onChangeFileCallback: (file: File) => void;
};

export const ImgUploader = memo(({ onChangeFileCallback }: Props): ReactElement => {
  console.log('imgUploader rendered');
  const handleChange = (file: File): void => {
    onChangeFileCallback(file);
  };

  return (
    <div>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    </div>
  );
});
