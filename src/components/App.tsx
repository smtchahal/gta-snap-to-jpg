import React, { useEffect, useState } from 'react';
import StyledDropzone from './StyledDropzone';
import UpdatePrompt from './UpdatePrompt';
import CookieConsent from './CookieConsent';
import { convertSnapmaticToJpeg } from '../helpers/util';
import JSZip from 'jszip';

const buttonClass =
  'text-sm no-underline cursor-pointer bg-[#1c1f24] py-3 px-4 select-none border-0 rounded-lg text-white';

type Image = {
  src: string;
  file: File;
};

const App = () => {
  const [images, setImages] = useState<Image[]>([]);
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
    /* istanbul ignore if -- @preserve */
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
    <>
      <UpdatePrompt />
      <CookieConsent />
      <div className="px-4 pb-4 text-center">
        <img
          src={`${import.meta.env.BASE_URL}logo192.png`}
          alt="Snapmatic"
          className="w-[92px] mx-auto"
        />
        <h1 className="text-[2em] font-bold my-[0.67em]">
          GTA V Snapmatic to JPEG / JPG converter
        </h1>
        <p>
          A simple tool to convert your GTA V Snapmatic snaps to JPEG / JPG
          files.
        </p>
        <p className="mt-4">
          <b>Note:</b> This only works locally. All conversion takes place in
          your browser. No files are uploaded.
        </p>
        {loading ? (
          <p className="text-[#55b7ff]">Converting images...</p>
        ) : (
          <div className="mt-4 max-w-[400px] flex justify-center mx-auto">
            <StyledDropzone onDrop={handleFileSelect}>
              Click here to select files, or drag and drop.
            </StyledDropzone>
          </div>
        )}
        {images.length > 0 && (
          <>
            <p className="flex flex-wrap justify-center items-baseline gap-2 mt-3">
              Click any image to download it.{' '}
              {zipUrl && (
                <a
                  href={zipUrl}
                  title="Download all images"
                  download="GTA V snaps.zip"
                  className={buttonClass}
                >
                  Download all
                </a>
              )}
              <button
                title="Clear all images"
                onClick={clearAll}
                className={buttonClass}
              >
                Clear all
              </button>
            </p>
            <ul className="p-0 mt-4 mx-auto list-none max-w-full md:max-w-[50vw]">
              {images.map((image, index) => (
                <li key={index} className="mt-4">
                  <a href={image.src} download={image.file.name}>
                    <img
                      src={image.src}
                      alt=""
                      title={image.file.name}
                      className="w-full"
                    />
                  </a>
                  <span>{image.file.name}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default App;
