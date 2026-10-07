export interface OpeningHour {
  id: string;
  days: string;
  hours: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

// Academy-wide data rendered by the layout (header, footer, contact blocks).
export interface SiteInfo {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  privacyEmail: string | null;
  address: string;
  city: string;
  foundedYear: number | null;
  officeHours: OpeningHour[];
  trainingHours: OpeningHour[];
  socialLinks: SocialLink[];
  programLinks: { id: string; name: string; ageRange: string }[];
}
