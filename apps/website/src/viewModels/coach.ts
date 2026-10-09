export default interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string | null;
  specialization: string;
  experience: number;
  bio: string | null;
  quote: string | null;
  certifications: string[];
  achievements: string[];
  rating: number;
  studentsCount: number;
  image: string | null;
  instagram: string | null;
  twitter: string | null;
  programs: { id: string; name: string }[];
}
