import type { NextApiRequest, NextApiResponse } from 'next';
import { getPrisma } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = await getPrisma();
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  switch (req.method) {
    case 'GET': {
      const program = await prisma.program.findUnique({
        where: { id },
        include: {
          coach: true,
          schedule: { orderBy: { displayOrder: 'asc' } },
        },
      });
      if (!program) {
        return res.status(404).json({ error: 'Program not found' });
      }
      return res.status(200).json(program);
    }

    case 'PUT': {
      const {
        name,
        description,
        price,
        duration,
        sessionCount,
        maxStudents,
        popular,
        icon,
        ageRange,
        minAge,
        maxAge,
        color,
        period,
        rating,
        studentsEnrolled,
        features,
        level,
        coachId,
        isActive,
        schedule,
      } = req.body;

      // Delete existing schedules and recreate
      await prisma.schedule.deleteMany({ where: { programId: id } });

      const program = await prisma.program.update({
        where: { id },
        data: {
          name,
          description,
          price,
          duration,
          sessionCount,
          maxStudents,
          popular,
          icon,
          ageRange,
          minAge,
          maxAge,
          color,
          period,
          rating,
          studentsEnrolled,
          features,
          level,
          coachId,
          isActive,
          schedule: {
            create: schedule?.map((s: { day: string; time: string; displayOrder?: number }, i: number) => ({
              day: s.day,
              time: s.time,
              displayOrder: s.displayOrder ?? i,
            })) ?? [],
          },
        },
        include: {
          coach: true,
          schedule: true,
        },
      });
      return res.status(200).json(program);
    }

    case 'DELETE': {
      await prisma.program.delete({ where: { id } });
      return res.status(204).end();
    }

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}