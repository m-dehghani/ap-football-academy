export async function getPrograms() {
  // Dynamically import Prisma to prevent Node.js modules from being bundled for the browser
  const { getPrisma } = await import('@/lib/db-server');
  const prisma = await getPrisma();
  const programs = await prisma.program.findMany({
    where: { isActive: true },
    include: { coach: true, registrations: true },
    orderBy: { createdAt: 'desc' },
  });

  return programs;
}
