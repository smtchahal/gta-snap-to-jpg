export const ERROR_FILE_TOO_SMALL =
  'Not a valid Snapmatic file (file too small)';

export const ERROR_INVALID_SNAPMATIC_FILE =
  'Not a valid Snapmatic file (converted file not JPEG)';

export const convertSnapmaticToJpeg = (file: File): Promise<File> => {
  const snapmaticOffset = 292;
  const headerLength = 4;
  const mimeHeaders = {
    jpeg: ['ffd8ffe0', 'ffd8ffe1', 'ffd8ffe2', 'ffd8ffe3', 'ffd8ffe8'],
  };
  return new Promise((resolve, reject) => {
    if (file.size < snapmaticOffset + headerLength) {
      reject(new Error(ERROR_FILE_TOO_SMALL));
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      /* istanbul ignore next */
      if (e.target === null) {
        reject(new Error('Failed to read the file'));
        return;
      }
      const result = (e.target as FileReader).result as ArrayBuffer;
      const slicedResult = result.slice(snapmaticOffset, result.byteLength);
      const imageArray = new Uint8Array(slicedResult);
      const header: string = Array.from(imageArray.subarray(0, headerLength))
        .map(i => i.toString(16))
        .join('');
      if (header && mimeHeaders.jpeg.includes(header)) {
        const blob = new Blob([imageArray], { type: 'image/jpeg' });
        resolve(new File([blob], `${file.name}.jpg`));
      } else {
        reject(new Error(ERROR_INVALID_SNAPMATIC_FILE));
      }
    };
    reader.readAsArrayBuffer(file);
  });
};
