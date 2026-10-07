import { getPrisma } from '@/lib/db';
import Program from '@/viewModels/program';

export async function getPrograms(): Promise<Program[]> {
  const prisma = await getPrisma();
  const programs = await prisma.program.findMany({
    where: { isActive: true },
    include: {
      coach: true,
      schedule: { orderBy: { displayOrder: 'asc' } },
    },
    orderBy: { displayOrder: 'asc' },
  });

  return programs.map((program) => ({
    id: program.id,
    name: program.name,
    description: program.description,
    price: program.price,
    duration: program.duration,
    sessionCount: program.sessionCount,
    maxStudents: program.maxStudents,
    popular: program.popular,
    icon: program.icon,
    ageRange: program.ageRange,
    minAge: program.minAge,
    maxAge: program.maxAge,
    color: program.color,
    period: program.period,
    rating: program.rating,
    studentsEnrolled: program.studentsEnrolled,
    features: program.features,
    level: program.level,
    coach: {
      id: program.coach.id,
      fullName: `${program.coach.firstName} ${program.coach.lastName}`,
      title: program.coach.title,
      experience: program.coach.experience,
      rating: program.coach.rating,
      studentsCount: program.coach.studentsCount,
    },
    schedule: program.schedule.map(({ id, day, time }) => ({ id, day, time })),
  }));
}
