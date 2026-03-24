import React from 'react';
import { render } from '@testing-library/react';
import { useDropzone } from 'react-dropzone';
import { vi } from 'vitest';
import StyledDropzone from '../StyledDropzone';

vi.mock('react-dropzone', () => ({
  useDropzone: vi.fn(),
}));

const mockUseDropzone = useDropzone as ReturnType<typeof vi.fn>;

const baseDropzone = {
  getRootProps: vi.fn().mockReturnValue({}),
  getInputProps: vi.fn().mockReturnValue({}),
};

describe('StyledDropzone', () => {
  it('applies drag-accept styles when isDragAccept is true', () => {
    mockUseDropzone.mockReturnValue({ ...baseDropzone, isDragAccept: true });
    const { container } = render(
      <StyledDropzone onDrop={vi.fn()}>drop here</StyledDropzone>,
    );
    expect(container.firstChild).toHaveClass('border-[#8bff8b]');
    expect(container.firstChild).not.toHaveClass('border-white');
  });

  it('applies default styles when isDragAccept is false', () => {
    mockUseDropzone.mockReturnValue({ ...baseDropzone, isDragAccept: false });
    const { container } = render(
      <StyledDropzone onDrop={vi.fn()}>drop here</StyledDropzone>,
    );
    expect(container.firstChild).toHaveClass('border-white');
    expect(container.firstChild).not.toHaveClass('border-[#8bff8b]');
  });
});
