// Dates are ISO strings so the objects can be passed through getServerSideProps.

export interface Statistic {
  value: string;
  label: string;
  description: string | null;
}

export type Statistics = Record<string, Statistic>;

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string | null;
  rating: number;
  improvement: string | null;
  date: string | null;
  programName: string | null;
}

export interface SuccessStory {
  id: string;
  playerName: string;
  age: number;
  achievement: string;
  description: string;
  quote: string | null;
  date: string;
  programName: string | null;
  coachName: string | null;
  stats: { goals: number; assists: number; matches: number };
}

export interface Milestone {
  id: string;
  year: number;
  title: string;
  description: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export interface Facility {
  id: string;
  category: string; // PITCH, EQUIPMENT
  name: string;
}

export interface NewsCategory {
  slug: string;
  name: string;
  icon: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  type: string; // NEWS, VIDEO, GALLERY
  author: string;
  image: string | null;
  tags: string[];
  readTimeMinutes: number;
  likes: number;
  comments: number;
  featured: boolean;
  publishedAt: string;
}
