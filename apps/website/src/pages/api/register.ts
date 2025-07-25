import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const registrationSchema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد'),
  email: z.string().email('ایمیل نامعتبر است'),
  phone: z.string().min(10, 'شماره تلفن نامعتبر است'),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
  programId: z.string().min(1, 'برنامه آموزشی الزامی است'),
  birthDate: z.string().min(1, 'تاریخ تولد الزامی است'),
  emergencyContact: z.string().min(10, 'شماره تماس اضطراری الزامی است'),
  medicalConditions: z.string().optional(),
  previousExperience: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Validate request body
    const validatedData = registrationSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'کاربری با این ایمیل قبلاً ثبت شده است' });
    }

    // Get program details
    const program = await prisma.program.findUnique({
      where: { id: validatedData.programId },
      include: { coach: true }
    });

    if (!program) {
      return res.status(404).json({ message: 'برنامه آموزشی یافت نشد' });
    }

    // Check if program has available slots
    const currentRegistrations = await prisma.registration.count({
      where: { 
        programId: validatedData.programId,
        status: { in: ['PENDING', 'APPROVED'] }
      }
    });

    if (currentRegistrations >= program.maxStudents) {
      return res.status(400).json({ message: 'ظرفیت این برنامه تکمیل شده است' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create user and registration in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email: validatedData.email,
          password: hashedPassword,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          phone: validatedData.phone,
          role: 'STUDENT'
        }
      });

      // Create registration
      const registration = await tx.registration.create({
        data: {
          userId: user.id,
          programId: validatedData.programId,
          totalAmount: program.price,
          status: 'PENDING'
        }
      });

      return { user, registration };
    });

    // Return success response (without password)
    res.status(201).json({
      message: 'ثبت نام با موفقیت انجام شد',
      data: {
        user: {
          id: result.user.id,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          email: result.user.email,
          phone: result.user.phone
        },
        registration: {
          id: result.registration.id,
          programId: result.registration.programId,
          status: result.registration.status,
          totalAmount: result.registration.totalAmount
        },
        program: {
          name: program.name,
          price: program.price,
          coach: program.coach.firstName + ' ' + program.coach.lastName
        }
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'اطلاعات ارسالی نامعتبر است',
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }

    res.status(500).json({ message: 'خطا در ثبت نام' });
  }
} 