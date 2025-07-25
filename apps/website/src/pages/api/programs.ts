import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/db';

type ProgramWithCoachAndCount = {
  id: string;
  name: string;
  description: string;
  ageGroup: string;
  price: number;
  duration: number;
  sessionCount: number;
  maxStudents: number;
  coach: {
    firstName: string;
    lastName: string;
    specialization: string;
    experience: number;
  };
  _count: {
    registrations: number;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const programs = await prisma.program.findMany({
      where: { isActive: true },
      include: {
        coach: {
          select: {
            firstName: true,
            lastName: true,
            specialization: true,
            experience: true
          }
        },
        _count: {
          select: {
            registrations: {
              where: {
                status: { in: ['PENDING', 'APPROVED'] }
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedPrograms = programs.map((program: ProgramWithCoachAndCount) => ({
      id: program.id,
      name: program.name,
      description: program.description,
      ageGroup: program.ageGroup,
      price: program.price,
      duration: program.duration,
      sessionCount: program.sessionCount,
      maxStudents: program.maxStudents,
      currentStudents: program._count.registrations,
      availableSlots: program.maxStudents - program._count.registrations,
      coach: {
        name: `${program.coach.firstName} ${program.coach.lastName}`,
        specialization: program.coach.specialization,
        experience: program.coach.experience
      }
    }));

    res.status(200).json({
      programs: formattedPrograms,
      total: formattedPrograms.length
    });

  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ message: 'خطا در دریافت برنامه‌ها' });
  }
} 