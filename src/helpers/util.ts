export interface Image {
  name: string;
  src: string;
}

export const getNameAndJpg = (file: File): Promise<Image | null> => {
  const snapmaticOffset = 292;
  const headerLength = 4;
  const mimeHeaders = {
    jpeg: ['ffd8ffe0', 'ffd8ffe1', 'ffd8ffe2', 'ffd8ffe3', 'ffd8ffe8'],
  };
  return new Promise(resolve => {
    if (file.size < snapmaticOffset + headerLength) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      if (e.target === null) {
        resolve(null);
        return;
      }
      const result = (e.target as FileReader).result as ArrayBuffer;
      const slicedResult = result.slice(snapmaticOffset, result.byteLength);
      const imageArray = new Uint8Array(slicedResult);
      const header: string = Array.from(imageArray.subarray(0, headerLength))
        .map(i => i.toString(16))
        .join('');
      if (header && mimeHeaders.jpeg.includes(header)) {
        resolve({
          name: file.name + '.jpg',
          src: window.URL.createObjectURL(
            new Blob([imageArray], { type: 'image/jpeg' }),
          ),
        });
      } else {
        resolve(null);
      }
    };
    reader.readAsArrayBuffer(file);
  });
};
