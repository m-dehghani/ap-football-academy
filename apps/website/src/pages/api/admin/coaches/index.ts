import type { NextApiRequest, NextApiResponse } from 'next';
import { getPrisma } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = await getPrisma();

  switch (req.method) {
    case 'GET': {
      const coaches = await prisma.coach.findMany({
        include: {
          programs: true,
        },
        orderBy: { displayOrder: 'asc' },
      });
      return res.status(200).json(coaches);
    }

    case 'POST': {
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

      const coach = await prisma.coach.create({
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
          certifications: certifications ?? [],
          achievements: achievements ?? [],
          rating: rating ?? 0,
          studentsCount: studentsCount ?? 0,
          image,
          instagram,
          twitter,
          isActive: isActive ?? true,
          displayOrder: displayOrder ?? 0,
        },
        include: {
          programs: true,
        },
      });
      return res.status(201).json(coach);
    }

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}