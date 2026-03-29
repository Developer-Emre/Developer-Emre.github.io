// GA4 Measurement ID: G-EJ6L2YBB10
declare function gtag(...args: unknown[]): void;

export const trackEvent = (
  eventName: string,
  params?: Record<string, string>,
): void => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', eventName, params);
  }
};

// Önceden tanımlı event'ler — magic string hatalarını önler
export const GA_EVENTS = {
  LINKEDIN_CLICK:   'linkedin_click',
  GITHUB_CLICK:     'github_click',
  RESUME_DOWNLOAD:  'resume_download',
} as const;
