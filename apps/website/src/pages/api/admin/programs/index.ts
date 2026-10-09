import type { NextApiRequest, NextApiResponse } from 'next';
import { getPrisma } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = await getPrisma();

  switch (req.method) {
    case 'GET': {
      const programs = await prisma.program.findMany({
        include: {
          coach: true,
          schedule: { orderBy: { displayOrder: 'asc' } },
        },
        orderBy: { displayOrder: 'asc' },
      });
      return res.status(200).json(programs);
    }
    case 'POST': {
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
        schedule,
      } = req.body;

      const program = await prisma.program.create({
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
      return res.status(201).json(program);
    }
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}