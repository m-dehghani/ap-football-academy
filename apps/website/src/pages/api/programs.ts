import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const programs = await prisma.program.findMany({
      where: { isActive: true },
      include: { coach: true },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      data: programs.map((program) => ({
        id: program.id,
        name: program.name,
        description: program.description,
        ageGroup: program.ageRange,
        price: program.price,
        duration: program.duration,
        sessionCount: program.sessionCount,
        maxStudents: program.maxStudents,
        coach: `${program.coach.firstName} ${program.coach.lastName}`,
        coachId: program.coachId,
      })),
    });
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ message: 'خطا در دریافت اطلاعات برنامه‌ها' });
  }
}
