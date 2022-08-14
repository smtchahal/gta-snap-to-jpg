import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import StyledDropzone from './StyledDropzone';
import { convertSnapmaticToJpeg } from '../helpers/util';
import JSZip from 'jszip';

const buttonStyle = css`
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  background-color: #1c1f24;
  padding: 12px 16px;
  user-select: none;
  border: none;
  border-radius: 8px;
  color: white;
`;

const Button = styled.button`
  ${buttonStyle}
`;

const Anchor = styled.a`
  ${buttonStyle};
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

type Image = {
  src: string;
  file: File;
};

const App = () => {
  const [images, setImages] = useState<string[]>([]);
  const [zipUrl, setZipUrl] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);

  const zipFilesAndSetUrl = async (files: File[]) => {
    if (files.length > 1) {
      const zip = new JSZip();
      for (const file of files) {
        zip.file(file.name, file);
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      setZipUrl(URL.createObjectURL(zipBlob));
    } else {
      setZipUrl(null);
    }
  };

  const handleFileSelect = async (files: File[]) => {
    /* istanbul ignore next */
    if (files.length === 0) {
      return;
    }

    setLoading(true);
    let error = false;
    const newImages: Image[] = [];
    for await (const inputFile of files) {
      try {
        const file = await convertSnapmaticToJpeg(inputFile);
        newImages.push({ file, src: URL.createObjectURL(file) });
      } catch (e) {
        error = true;
      }
    }

    if (error) {
      alert(
        'Some images could not be converted, as they were not valid Snapmatic images',
      );
    }

    setImages(images => images.concat(newImages));
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const files = images.map(i => i.file);
      await zipFilesAndSetUrl(files);
    })();
  }, [images]);

  const clearAll = () => {
    setImages([]);
  };

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <img
        src={`${process.env.PUBLIC_URL}/logo192.png`}
        alt="Snapmatic"
        style={{ width: 92 }}
      />
      <h1>GTA V Snapmatic to JPEG / JPG converter</h1>
      <p>
        A simple tool to convert your GTA V Snapmatic snaps to JPEG / JPG files.
      </p>
      <p>
        <b>Note:</b> This only works locally. All conversion takes place in your
        browser. No files are uploaded.
      </p>
      {loading ? (
        <p style={{ color: '#55b7ff' }}>Converting images...</p>
      ) : (
        <DropzoneContainer>
          <StyledDropzone onDrop={handleFileSelect}>
            Click here to select files, or drag and drop.
          </StyledDropzone>
        </DropzoneContainer>
      )}
      {images.length > 0 && (
        <>
          <p
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'baseline',
              gap: 8,
            }}
          >
            Click any image to download it.{' '}
            {zipUrl && (
              <Anchor
                href={zipUrl}
                title="Download all images"
                download="GTA V snaps.zip"
              >
                Download all
              </Anchor>
            )}
            <Button title="Clear all images" onClick={clearAll}>
              Clear all
            </Button>
          </p>
          <Ul>
            {images.map((image, index) => (
              <Li key={index}>
                <a href={image.src} download={image.file.name}>
                  <Img src={image.src} title={image.file.name} />
                </a>
                <span>{image.file.name}</span>
              </Li>
            ))}
          </Ul>
        </>
      )}
    </div>
  );
};

export default App;
