import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { authorizeStudent, normalizePhone } from '@/lib/auth';
import { getPrisma } from '@/lib/db';
import { parseBirthDateInput } from '@/lib/age';

const profileSchema = z
  .object({
    firstName: z.string().trim().min(2).max(100),
    lastName: z.string().trim().min(2).max(100),
    email: z.union([z.string().trim().email(), z.literal('')]).optional(),
    phone: z
      .union([
        z.string().regex(/^\+?[\d۰-۹٠-٩\s().-]{7,20}$/),
        z.literal(''),
      ])
      .optional(),
    birthDate: z
      .union([z.string(), z.literal('')])
      .optional()
      .refine((value) => !value || parseBirthDateInput(value) !== null, {
        message: 'تاریخ تولد معتبر نیست',
      }),
  })
  .refine((data) => Boolean(data.email?.trim() || data.phone?.trim()), {
    message: 'وارد کردن ایمیل یا شماره تلفن الزامی است',
    path: ['email'],
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', 'PATCH');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const userId = await authorizeStudent(req, res);
    if (!userId) return;

    const data = profileSchema.parse(req.body);
    const email = data.email?.trim().toLowerCase() || null;
    const phone = data.phone?.trim() ? normalizePhone(data.phone) : null;
    const identifiers = [
      ...(email
        ? [{ email: { equals: email, mode: 'insensitive' as const } }]
        : []),
      ...(phone ? [{ phone }] : []),
    ];
    const db = await getPrisma();
    const [existingUser, existingCoach] = await Promise.all([
      db.user.findFirst({
        where: { OR: identifiers, NOT: { id: userId } },
        select: { id: true },
      }),
      db.coach.findFirst({
        where: { OR: identifiers },
        select: { id: true },
      }),
    ]);
    if (existingUser || existingCoach) {
      return res
        .status(409)
        .json({ message: 'این ایمیل یا شماره تلفن قبلاً استفاده شده است' });
    }

    const user = await db.user.update({
      where: { id: userId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email,
        phone,
        birthDate: data.birthDate ? parseBirthDateInput(data.birthDate) : null,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        birthDate: true,
      },
    });
    return res.status(200).json({ user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'اطلاعات پروفایل معتبر نیست',
        errors: error.issues.map(({ path, message }) => ({
          field: path.join('.'),
          message,
        })),
      });
    }
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return res
        .status(409)
        .json({ message: 'این ایمیل یا شماره تلفن قبلاً استفاده شده است' });
    }
    console.error('Student profile update error:', error);
    return res.status(500).json({ message: 'خطا در ذخیره اطلاعات پروفایل' });
  }
}
