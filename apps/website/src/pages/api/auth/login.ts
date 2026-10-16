import { NextApiRequest, NextApiResponse } from 'next';
import { getPrisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { SignJWT } from 'jose';

const loginSchema = z.object({
  email: z.string().email('ایمیل نامعتبر است'),
  password: z.string().min(1, 'رمز عبور الزامی است'),
  role: z.enum(['STUDENT', 'COACH', 'ADMIN']).optional(),
});

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedData = loginSchema.parse(req.body);
    const db = await getPrisma();

    let user = null;
    let userRole = validatedData.role || 'STUDENT';

    // Try to find user based on role
    if (userRole === 'ADMIN') {
      user = await db.user.findUnique({
        where: { email: validatedData.email },
      });
      if (user && user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'دسترسی ادمین ندارید' });
      }
    } else if (userRole === 'COACH') {
      const coach = await db.coach.findUnique({
        where: { email: validatedData.email },
      });
      if (coach) {
        user = {
          id: coach.id,
          email: coach.email,
          password: coach.password,
          firstName: coach.firstName,
          lastName: coach.lastName,
          role: 'COACH',
        };
      }
    } else {
      // Default to student
      user = await db.user.findUnique({
        where: { email: validatedData.email },
      });
    }

    if (!user) {
      return res.status(401).json({ message: 'ایمیل یا رمز عبور اشتباه است' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'ایمیل یا رمز عبور اشتباه است' });
    }

    // Create JWT token
    const token = await new SignJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET);

    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', [
      `auth_token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
    ]);

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({
      message: 'ورود با موفقیت انجام شد',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'اطلاعات ارسالی نامعتبر است',
        errors: error.issues.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }

    res.status(500).json({ message: 'خطا در ورود' });
  }
}