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
      const coach = await prisma.coach.findUnique({
        where: { id },
        include: {
          programs: true,
        },
      });
      if (!coach) {
        return res.status(404).json({ error: 'Coach not found' });
      }
      return res.status(200).json(coach);
    }

    case 'PUT': {
      const {
        firstName,
        lastName,
        email,
        phone,
        specialization,
        experience,
        title,
        bio,
        quote,
        certifications,
        achievements,
        rating,
        studentsCount,
        image,
        instagram,
        twitter,
        isActive,
        displayOrder,
      } = req.body;

      const coach = await prisma.coach.update({
        where: { id },
        data: {
          firstName,
          lastName,
          email,
          phone,
          specialization,
          experience,
          title,
          bio,
          quote,
          certifications,
          achievements,
          rating,
          studentsCount,
          image,
          instagram,
          twitter,
          isActive,
          displayOrder,
        },
        include: {
          programs: true,
        },
      });
      return res.status(200).json(coach);
    }

    case 'DELETE': {
      await prisma.coach.delete({ where: { id } });
      return res.status(204).end();
    }

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}