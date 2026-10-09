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
      const registration = await prisma.registration.findUnique({
        where: { id },
        include: {
          user: true,
          program: {
            include: { coach: true },
          },
          payments: true,
        },
      });
      if (!registration) {
        return res.status(404).json({ error: 'Registration not found' });
      }
      return res.status(200).json(registration);
    }

    case 'PUT': {
      const { status, totalAmount, paidAmount, experienceLevel, parentName, parentEmail, emergencyContactName, emergencyContactPhone, medicalConditions } = req.body;

      const registration = await prisma.registration.update({
        where: { id },
        data: {
          status,
          totalAmount,
          paidAmount,
          experienceLevel,
          parentName,
          parentEmail,
          emergencyContactName,
          emergencyContactPhone,
          medicalConditions,
        },
        include: {
          user: true,
          program: {
            include: { coach: true },
          },
          payments: true,
        },
      });
      return res.status(200).json(registration);
    }

    case 'DELETE': {
      await prisma.registration.delete({ where: { id } });
      return res.status(204).end();
    }

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}