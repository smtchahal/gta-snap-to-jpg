import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { useRegisterSW } from 'virtual:pwa-register/react';
import UpdatePrompt from '../UpdatePrompt';

vi.mock('virtual:pwa-register/react', () => ({
  useRegisterSW: vi.fn(),
}));

const mockUpdateServiceWorker = vi.fn();
const mockSetNeedRefresh = vi.fn();
const mockUseRegisterSW = vi.mocked(useRegisterSW);

describe('UpdatePrompt', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when no update is available', () => {
    mockUseRegisterSW.mockReturnValue({
      needRefresh: [false, mockSetNeedRefresh],
      offlineReady: [false, vi.fn()],
      updateServiceWorker: mockUpdateServiceWorker,
    });
    const { container } = render(<UpdatePrompt />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the prompt when an update is available', () => {
    mockUseRegisterSW.mockReturnValue({
      needRefresh: [true, mockSetNeedRefresh],
      offlineReady: [false, vi.fn()],
      updateServiceWorker: mockUpdateServiceWorker,
    });
    render(<UpdatePrompt />);
    expect(screen.getByText(/a new version is available/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /dismiss/i }),
    ).toBeInTheDocument();
  });

  it('calls updateServiceWorker(true) when Update is clicked', async () => {
    mockUseRegisterSW.mockReturnValue({
      needRefresh: [true, mockSetNeedRefresh],
      offlineReady: [false, vi.fn()],
      updateServiceWorker: mockUpdateServiceWorker,
    });
    render(<UpdatePrompt />);
    await userEvent.click(screen.getByRole('button', { name: /update/i }));
    expect(mockUpdateServiceWorker).toHaveBeenCalledWith(true);
  });

  it('calls setNeedRefresh(false) when Dismiss is clicked', async () => {
    mockUseRegisterSW.mockReturnValue({
      needRefresh: [true, mockSetNeedRefresh],
      offlineReady: [false, vi.fn()],
      updateServiceWorker: mockUpdateServiceWorker,
    });
    render(<UpdatePrompt />);
    await userEvent.click(screen.getByRole('button', { name: /dismiss/i }));
    expect(mockSetNeedRefresh).toHaveBeenCalledWith(false);
  });
});
