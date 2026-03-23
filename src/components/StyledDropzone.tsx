import React from 'react';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';

export interface Props {
  onDrop: {
    (files: File[]): void;
  };
  children: any;
}

const StyledDropzone = ({ onDrop, children }: Props) => {
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'cursor-pointer border-2 border-dashed rounded-lg p-4 select-none focus:outline-none active:outline-none focus-visible:border-solid',
        isDragAccept ? 'border-[#8bff8b] text-[#8bff8b]' : 'border-white',
      )}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export default StyledDropzone;
