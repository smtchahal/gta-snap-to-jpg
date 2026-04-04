export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number>,
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};
