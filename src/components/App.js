import React, { useState } from 'react';
import styled from 'styled-components';
import StyledDropzone from './StyledDropzone';
import { getNameAndJpg } from '../helpers/util';

const Button = styled.button`
  cursor: pointer;
  background-color: #1c1f24;
  padding: 12px 16px;
  user-select: none;
  border: none;
  border-radius: 8px;
  color: white;
`;

const Img = styled.img`
  width: 100%;
`;

const Ul = styled.ul`
  padding: 0;
  margin: 16px auto 0;
  list-style: none;
  max-width: 50vw;

  @media (max-width: 767.98px) {
    max-width: 100%;
  }
`;

const Li = styled.li`
  margin-top: 16px;
`;

const DropzoneContainer = styled.div`
  margin-top: 16px;
  max-width: 400px;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

const App = () => {
  const [images, setImages] = useState([]);

  const handleFileSelect = async files => {
    if (files.length === 0) {
      return;
    }

    let error = false;
    const newImages = [];
    for await (const file of files) {
      const image = await getNameAndJpg(file);
      if (image) {
        newImages.push(image);
      } else {
        error = true;
      }
    }

    if (error) {
      alert(
        'Some images could not be converted, as they were not valid Snapmatic images',
      );
    }

    setImages(images => images.concat(newImages));
  };

  const clearAll = () => {
    setImages([]);
  };

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <h1>GTA V Snapmatic to JPEG / JPG converter</h1>
      <p>
        A simple tool to convert your GTA V Snapmatic snaps to JPEG / JPG files.
      </p>
      <p>
        <b>Note:</b> This only works locally. All conversion takes place in your
        browser. No files are uploaded.
      </p>
      <DropzoneContainer>
        <StyledDropzone onDrop={handleFileSelect} />
      </DropzoneContainer>
      {images.length > 0 && (
        <>
          <p>
            Click any image to download it.{' '}
            <Button title="Clear all images" onClick={clearAll}>
              Clear all
            </Button>
          </p>
          <Ul>
            {images.map((image, index) => (
              <Li key={index}>
                <a href={image.src} download={image.name}>
                  <Img src={image.src} title={image.name} />
                </a>
                <span>{image.name}</span>
              </Li>
            ))}
          </Ul>
        </>
      )}
    </div>
  );
};

export default App;
