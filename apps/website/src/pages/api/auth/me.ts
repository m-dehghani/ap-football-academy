import { NextApiRequest, NextApiResponse } from 'next';
import { getPrisma } from '@/lib/db';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({ message: 'احراز هویت نشده' });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);

    const db = await getPrisma();

    let user = null;

    if (payload.role === 'COACH') {
      const coach = await db.coach.findUnique({
        where: { id: payload.userId as string },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          specialization: true,
          title: true,
          image: true,
          isActive: true,
        },
      });
      if (coach) {
        user = { ...coach, role: 'COACH' };
      }
    } else if (payload.role === 'ADMIN') {
      const admin = await db.user.findUnique({
        where: { id: payload.userId as string },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
        },
      });
      if (admin) {
        user = admin;
      }
    } else {
      // Student
      const student = await db.user.findUnique({
        where: { id: payload.userId as string },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          birthDate: true,
          role: true,
          registrations: {
            include: {
              program: {
                include: { coach: true },
              },
            },
          },
        },
      });
      if (student) {
        user = student;
      }
    }

    if (!user) {
      return res.status(404).json({ message: 'کاربر یافت نشد' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(401).json({ message: 'توکن نامعتبر یا منقضی شده' });
  }
}