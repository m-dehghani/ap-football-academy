import { getPrisma } from '@/lib/db';

export async function getPrograms() {
  const prisma = await getPrisma();
  const programs = await prisma.program.findMany({
    where: { isActive: true },
    include: { coach: true, registrations: true },
    orderBy: { createdAt: 'desc' },
  });

  return programs;
}
