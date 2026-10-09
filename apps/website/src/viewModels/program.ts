import Schedule from './schedule';

export default interface Program {
  id: string;
  name: string;
  description: string;
  price: number; // Toman
  duration: number; // Months
  sessionCount: number;
  maxStudents: number;
  popular: boolean;
  icon: string;
  ageRange: string;
  minAge: number;
  maxAge: number;
  color: string;
  period: string;
  rating: number;
  studentsEnrolled: number;
  features: string[];
  level: string;
  coach: {
    id: string;
    fullName: string;
    title: string | null;
    experience: number;
    rating: number;
    studentsCount: number;
  };
  schedule: Schedule[];
}
