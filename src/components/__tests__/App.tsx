import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../App';
import userEvent from '@testing-library/user-event';
import * as fs from 'fs';
import { vi } from 'vitest';

const selectAndGetFileInput = () => {
  const button = screen.getByText(/select files/i);
  expect(button).toBeInTheDocument();
  const fileInput = button.querySelector('input') as HTMLInputElement;
  expect(fileInput).toBeInTheDocument();
  expect(fileInput.files).toHaveLength(0);
  expect(screen.queryByText(/converting images/i)).not.toBeInTheDocument();
  return fileInput;
};

const uploadAndCheck = async (fileInput: HTMLInputElement, files: File[]) => {
  await userEvent.upload(fileInput, files);
  expect(fileInput.files).toHaveLength(files.length);
  expect(Array.from(fileInput.files || [])).toStrictEqual(files);
};

const checkConvertedFiles = async (validFiles: File[]) => {
  for (const file of validFiles) {
    const fileNameElm = await screen.findByText(`${file.name}.jpg`);
    expect(fileNameElm).toBeVisible();
    const fileAnchorTag = fileNameElm.parentNode?.querySelector('a[download]');
    expect(fileAnchorTag).toBeVisible();
    expect(fileAnchorTag?.getAttribute('download')).toBe(`${file.name}.jpg`);
    expect(fileAnchorTag?.querySelector('img')).toBeVisible();
  }
  expect(screen.getByText(/click any image to download it/i)).toBeVisible();
  expect(screen.getByTitle(/clear all images/i)).toBeVisible();
  if (validFiles.length > 1) {
    expect(await screen.findByTitle(/download all images/i)).toBeVisible();
  } else {
    expect(screen.queryByTitle(/download all images/i)).toBeNull();
  }
};

window.alert = vi.fn();
window.URL.createObjectURL = () => 'blob:http://localhost/';

const invalidFile1 = new File(['hello'], 'hello.txt', { type: 'text/plain' });
const invalidFile2 = new File(['something else'], 'hello.png', {
  type: 'text/png',
});
const [validFile1, validFile2] = ['snapmatic1', 'snapmatic2'].map(
  name => new File([fs.readFileSync(`${__dirname}/fixtures/${name}`)], name),
);

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<App />);
    const app = screen.getByText(/a simple tool to convert your/i);
    expect(app).toBeInTheDocument();
  });

  it('shows alert when invalid file is uploaded', async () => {
    render(<App />);
    const fileInput = selectAndGetFileInput();
    expect(window.alert).not.toHaveBeenCalled();
    await uploadAndCheck(fileInput, [invalidFile1]);
    expect(window.alert).toHaveBeenCalled();
  });

  it('converts valid file', async () => {
    render(<App />);
    const fileInput = selectAndGetFileInput();
    expect(window.alert).not.toHaveBeenCalled();
    await uploadAndCheck(fileInput, [validFile1]);
    await checkConvertedFiles([validFile1]);
  });

  it('shows alert for invalid and converts valid files', async () => {
    render(<App />);
    const fileInput = selectAndGetFileInput();
    const files = [invalidFile1, validFile1];
    expect(window.alert).not.toHaveBeenCalled();
    await uploadAndCheck(fileInput, files);
    await checkConvertedFiles([validFile1]);
    expect(window.alert).toHaveBeenCalled();
  });

  it('shows alert for multiple invalid and converts multiple valid files', async () => {
    render(<App />);
    const fileInput = selectAndGetFileInput();
    const files = [invalidFile1, validFile1, invalidFile2, validFile2];
    expect(window.alert).not.toHaveBeenCalled();
    await uploadAndCheck(fileInput, files);
    await checkConvertedFiles([validFile1, validFile2]);
    expect(window.alert).toHaveBeenCalled();
  });

  it('clears files when "Clear all" button is clicked', async () => {
    render(<App />);
    const fileInput = selectAndGetFileInput();
    await uploadAndCheck(fileInput, [validFile1]);
    await checkConvertedFiles([validFile1]);
    expect(window.alert).not.toHaveBeenCalled();
    const clearAllButton = screen.getByTitle(/clear all images/i);
    await userEvent.click(clearAllButton);
    expect(screen.queryByText(/click any image to download it/i)).toBeNull();
    expect(screen.queryByTitle(/clear all images/i)).toBeNull();
    expect(screen.queryByTitle(/download all images/i)).toBeNull();
  });
});
