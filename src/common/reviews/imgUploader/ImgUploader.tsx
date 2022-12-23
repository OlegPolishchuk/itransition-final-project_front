import React, {FC} from 'react';
import {FileUploader} from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

type Props = {
  onChangeFileCallback: (file: File) => void
}

export const ImgUploader: FC<Props> = ({onChangeFileCallback}) => {
  const handleChange = (file: File) => {
    onChangeFileCallback(file);
  };

  return (
    <div>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    </div>
  );
};
