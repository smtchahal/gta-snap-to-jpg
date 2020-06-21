import React from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';

const DropzoneContainer = styled.div`
  margin-top: 16px;
  max-width: 400px;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #1c1f24;
  padding: 12px 16px;
  user-select: none;
  border: none;
  border-radius: 8px;
  color: white;
`;

const FileInput = styled.div`
  cursor: pointer;
  border: dashed white 2px;
  border-radius: 8px;
  padding: 16px;

  &:focus,
  &:active {
    outline: none;
  }
`;

const Img = styled.img`
  width: 100%;
`;

const Ul = styled.ul`
  padding: 0;
  margin: 16px auto 0;
  list-style: none;
  max-width: 50vw;

  @media (max-width: 767px) {
    max-width: 100%;
  }
`;

const Li = styled.li`
  margin-top: 16px;
`;

const getNameAndJpg = file => {
  const mimeHeaders = {
    jpeg: ['ffd8ffe0', 'ffd8ffe1', 'ffd8ffe2', 'ffd8ffe3', 'ffd8ffe8'],
  };
  return new Promise(resolve => {
    if (file.length < 292 + 4) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target.result;
      const slicedResult = result.slice(292, result.size);
      const imageArray = new Uint8Array(slicedResult);
      const header = Array.from(imageArray.subarray(0, 4))
        .map(i => i.toString(16))
        .join('');
      if (header && mimeHeaders.jpeg.includes(header)) {
        resolve({
          name: file.name + '.jpg',
          src: window.URL.createObjectURL(new Blob([imageArray])),
        });
      } else {
        resolve(null);
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

class App extends React.PureComponent {
  state = { images: [] };

  handleFileSelect = async files => {
    if (files.length === 0) {
      return;
    }

    let error = false;
    const images = [...this.state.images];
    for await (const file of files) {
      const image = await getNameAndJpg(file);
      if (image) {
        images.push(image);
      } else {
        error = true;
      }
    }

    if (error) {
      alert(
        'Some images could not be converted, as they were not valid ' +
          'Snapmatic images',
      );
    }

    this.setState({ images: images });
  };

  clearAll = () => {
    this.setState({ images: [] });
  };

  render = () => (
    <div className="container" style={{ textAlign: 'center' }}>
      <h1>GTA V Snapmatic to JPEG / JPG converter</h1>
      <p>A simple tool to convert your GTA V Snapmatic snaps to JPEG / JPG files.</p>
      <p>
        <b>Note:</b> This only works locally. All conversion takes place in your
        browser. No files are uploaded.
      </p>
      <DropzoneContainer>
        <Dropzone onDrop={this.handleFileSelect}>
          {({ getRootProps, getInputProps }) => (
            <FileInput {...getRootProps()}>
              <input {...getInputProps()} />
              Click here to select files, or drag and drop.
            </FileInput>
          )}
        </Dropzone>
      </DropzoneContainer>
      {this.state.images.length > 0 && (
        <>
          <p>
            Click any image to download it.{' '}
            <Button title="Clear all images" onClick={this.clearAll}>
              Clear all
            </Button>
          </p>
          <Ul>
            {this.state.images.map((image, index) => (
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
}

export default App;
