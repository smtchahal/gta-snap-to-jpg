import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import * as VanillaCookieConsent from 'vanilla-cookieconsent';
import CookieConsent from '../CookieConsent';

vi.mock('vanilla-cookieconsent/dist/cookieconsent.css', () => ({}));
vi.mock('vanilla-cookieconsent', () => ({
  run: vi.fn(),
}));

const mockRun = vi.mocked(VanillaCookieConsent.run);

describe('CookieConsent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing', () => {
    const { container } = render(<CookieConsent />);
    expect(container).toBeEmptyDOMElement();
  });

  it('calls CookieConsent.run on mount with correct config', () => {
    render(<CookieConsent />);
    expect(mockRun).toHaveBeenCalledTimes(1);
    const config = mockRun.mock.calls[0][0];
    expect(config.categories).toHaveProperty('necessary');
    expect(config.categories!.necessary!.readOnly).toBe(true);
    expect(config.categories).toHaveProperty('analytics');
    expect(config.language?.default).toBe('en');
  });

  it('does not call CookieConsent.run again on re-render', () => {
    const { rerender } = render(<CookieConsent />);
    rerender(<CookieConsent />);
    expect(mockRun).toHaveBeenCalledTimes(1);
  });
});
