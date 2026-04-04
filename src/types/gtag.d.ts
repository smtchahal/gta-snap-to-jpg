interface Window {
  gtag?: (
    command: string,
    eventName: string,
    params?: Record<string, string | number>,
  ) => void;
}
