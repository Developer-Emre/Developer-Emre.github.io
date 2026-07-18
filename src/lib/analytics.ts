// GA4 Measurement ID: G-EJ6L2YBB10
declare function gtag(...args: unknown[]): void;

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number>,
): void => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', eventName, params);
  }
};

// ─── Event Definitions ─────────────────────────────────────────────────────
export const GA_EVENTS = {
  // Navigation
  NAV_CLICK:        'nav_click',
  SECTION_VIEW:     'section_view',
  
  // Social & External
  LINKEDIN_CLICK:   'linkedin_click',
  GITHUB_CLICK:     'github_click',
  EMAIL_CLICK:      'email_click',
  
  // Actions
  RESUME_DOWNLOAD:  'resume_download',
  PROJECT_CLICK:    'project_click',
  PROJECT_GITHUB:   'project_github',
  PROJECT_LIVE:     'project_live',
  CONTACT_SUBMIT:   'contact_submit',
  
  // Engagement
  SKILL_VIEW:       'skill_view',
  EXPERIENCE_VIEW:  'experience_view',
  SCROLL_DEPTH:     'scroll_depth',
} as const;

// ─── Analytics Helpers ────────────────────────────────────────────────────
export const analytics = {
  // Navigation
  navClick: (label: string) => {
    trackEvent(GA_EVENTS.NAV_CLICK, { section: label });
  },

  sectionView: (sectionName: string) => {
    trackEvent(GA_EVENTS.SECTION_VIEW, { section: sectionName });
  },

  // Social Links
  linkedinClick: () => {
    trackEvent(GA_EVENTS.LINKEDIN_CLICK, { destination: 'linkedin' });
  },

  githubClick: () => {
    trackEvent(GA_EVENTS.GITHUB_CLICK, { destination: 'github' });
  },

  emailClick: (email: string) => {
    trackEvent(GA_EVENTS.EMAIL_CLICK, { email_address: email });
  },

  // Actions
  resumeDownload: () => {
    trackEvent(GA_EVENTS.RESUME_DOWNLOAD, { file_type: 'pdf' });
  },

  projectClick: (projectName: string, projectId: number) => {
    trackEvent(GA_EVENTS.PROJECT_CLICK, { project_name: projectName, project_id: projectId });
  },

  projectGithub: (projectName: string) => {
    trackEvent(GA_EVENTS.PROJECT_GITHUB, { project_name: projectName, action: 'view_github' });
  },

  projectLive: (projectName: string) => {
    trackEvent(GA_EVENTS.PROJECT_LIVE, { project_name: projectName, action: 'visit_live' });
  },

  contactSubmit: (contactMethod: string) => {
    trackEvent(GA_EVENTS.CONTACT_SUBMIT, { method: contactMethod });
  },

  // Engagement
  skillView: (skillName: string, category: string) => {
    trackEvent(GA_EVENTS.SKILL_VIEW, { skill_name: skillName, category });
  },

  experienceView: (company: string, role: string) => {
    trackEvent(GA_EVENTS.EXPERIENCE_VIEW, { company, role });
  },

  scrollDepth: (depth: number) => {
    trackEvent(GA_EVENTS.SCROLL_DEPTH, { depth_percent: depth });
  },
} as const;
