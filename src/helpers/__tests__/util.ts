import {
  convertSnapmaticToJpeg,
  ERROR_FILE_TOO_SMALL,
  ERROR_INVALID_SNAPMATIC_FILE,
} from '../util';
import * as fs from 'fs';

const validFileName = 'snapmatic';

describe('convertSnapmaticToJpeg', () => {
  it('should convert a Snapmatic file to a JPEG file', async () => {
    const file = new File(
      [fs.readFileSync(`${__dirname}/fixtures/${validFileName}`)],
      validFileName,
    );
    const result = await convertSnapmaticToJpeg(file);
    expect(result.name).toBe(`${validFileName}.jpg`);
    const sampleJpeg = fs.readFileSync(
      `${__dirname}/fixtures/${validFileName}.jpg`,
    );
    expect(Buffer.from(await result.arrayBuffer())).toStrictEqual(sampleJpeg);
  });

  it('should fail for empty files', async () => {
    expect.assertions(1);
    const file = new File(
      [fs.readFileSync(`${__dirname}/fixtures/empty`)],
      validFileName,
    );
    try {
      await convertSnapmaticToJpeg(file);
    } catch (e) {
      expect(e).toStrictEqual(new Error(ERROR_FILE_TOO_SMALL));
    }
  });

  it('should fail for JPEG files', async () => {
    expect.assertions(1);
    const file = new File(
      [fs.readFileSync(`${__dirname}/fixtures/sample.jpg`)],
      validFileName,
    );
    try {
      await convertSnapmaticToJpeg(file);
    } catch (e) {
      expect(e).toStrictEqual(new Error(ERROR_INVALID_SNAPMATIC_FILE));
    }
  });

  it('should fail for small files', async () => {
    expect.assertions(1);
    const file = new File(
      [fs.readFileSync(`${__dirname}/fixtures/small.txt`)],
      validFileName,
    );
    try {
      await convertSnapmaticToJpeg(file);
    } catch (e) {
      expect(e).toStrictEqual(new Error(ERROR_FILE_TOO_SMALL));
    }
  });
});
