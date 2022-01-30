import React from 'react';
import styled, { css } from 'styled-components';
import { useDropzone } from 'react-dropzone';

interface FileInputProps {
  isDragAccept: boolean;
}

const lightGreen = '#8bff8b';

const acceptStyle = css`
  border-color: ${lightGreen};
  color: ${lightGreen};
`;

const FileInput = styled.div`
  cursor: pointer;
  border: dashed white 2px;
  border-radius: 8px;
  padding: 16px;
  user-select: none;

  &:focus,
  &:active {
    outline: none;
  }

  ${({ isDragAccept }: FileInputProps) => isDragAccept && acceptStyle}
`;

export interface Props {
  onDrop: {
    (files: File[]): void;
  };
}

const StyledDropzone = ({ onDrop }: Props) => {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  return (
    <FileInput {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      Click here to select files, or drag and drop.
    </FileInput>
  );
};

export default StyledDropzone;
