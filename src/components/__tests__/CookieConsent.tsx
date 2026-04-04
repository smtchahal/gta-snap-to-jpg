import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import * as CookieConsent from 'vanilla-cookieconsent';
import CookieConsentComponent from '../CookieConsent';

vi.mock('vanilla-cookieconsent/dist/cookieconsent.css', () => ({}));
vi.mock('vanilla-cookieconsent', () => ({
  run: vi.fn(),
}));

const mockRun = vi.mocked(CookieConsent.run);

describe('CookieConsent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing', () => {
    const { container } = render(<CookieConsentComponent />);
    expect(container).toBeEmptyDOMElement();
  });

  it('calls CookieConsent.run on mount with correct config', () => {
    render(<CookieConsentComponent />);
    expect(mockRun).toHaveBeenCalledTimes(1);
    const config = mockRun.mock.calls[0][0];
    expect(config.categories).toHaveProperty('necessary');
    expect(config.categories!.necessary!.readOnly).toBe(true);
    expect(config.categories).toHaveProperty('analytics');
    expect(config.language?.default).toBe('en');
  });

  it('does not call CookieConsent.run again on re-render', () => {
    const { rerender } = render(<CookieConsentComponent />);
    rerender(<CookieConsentComponent />);
    expect(mockRun).toHaveBeenCalledTimes(1);
  });
});
