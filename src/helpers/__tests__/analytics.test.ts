import { trackEvent } from '../analytics';

describe('trackEvent', () => {
  afterEach(() => {
    delete window.gtag;
  });

  it('calls window.gtag with event name and params when gtag is defined', () => {
    window.gtag = vi.fn();
    trackEvent('test_event', { count: 3 });
    expect(window.gtag).toHaveBeenCalledWith('event', 'test_event', {
      count: 3,
    });
  });

  it('calls window.gtag with only event name when no params given', () => {
    window.gtag = vi.fn();
    trackEvent('test_event');
    expect(window.gtag).toHaveBeenCalledWith('event', 'test_event', undefined);
  });

  it('does not throw when window.gtag is not defined', () => {
    expect(() => trackEvent('test_event', { count: 1 })).not.toThrow();
  });
});
