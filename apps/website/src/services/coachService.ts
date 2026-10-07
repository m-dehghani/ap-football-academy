import { getPrisma } from '@/lib/db';
import Coach from '@/viewModels/coach';

export async function getCoaches(): Promise<Coach[]> {
  const prisma = await getPrisma();
  const coaches = await prisma.coach.findMany({
    where: { isActive: true },
    include: {
      programs: {
        where: { isActive: true },
        select: { id: true, name: true },
        orderBy: { displayOrder: 'asc' },
      },
    },
    orderBy: { displayOrder: 'asc' },
  });

  return coaches.map((coach) => ({
    id: coach.id,
    firstName: coach.firstName,
    lastName: coach.lastName,
    fullName: `${coach.firstName} ${coach.lastName}`,
    title: coach.title,
    specialization: coach.specialization,
    experience: coach.experience,
    bio: coach.bio,
    quote: coach.quote,
    certifications: coach.certifications,
    achievements: coach.achievements,
    rating: coach.rating,
    studentsCount: coach.studentsCount,
    image: coach.image,
    instagram: coach.instagram,
    twitter: coach.twitter,
    programs: coach.programs,
  }));
}
