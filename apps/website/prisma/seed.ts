import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.evaluation.deleteMany({});
  await prisma.attendance.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.registration.deleteMany({});
  await prisma.program.deleteMany({});
  await prisma.coach.deleteMany({});
  await prisma.user.deleteMany({});

  // Create coaches
  const coaches = await Promise.all([
    prisma.coach.create({
      data: {
        firstName: 'احمد',
        lastName: 'کریمی',
        email: 'ahmad.karimi@apfootball.com',
        phone: '09123456789',
        specialization: 'آموزش کودکان و نوجوانان',
        experience: 8,
      },
    }),
    prisma.coach.create({
      data: {
        firstName: 'محمد',
        lastName: 'رضایی',
        email: 'mohammad.rezaei@apfootball.com',
        phone: '09123456790',
        specialization: 'آموزش بزرگسالان و تاکتیک',
        experience: 12,
      },
    }),
    prisma.coach.create({
      data: {
        firstName: 'علی',
        lastName: 'احمدی',
        email: 'ali.ahmadi@apfootball.com',
        phone: '09123456791',
        specialization: 'آماده‌سازی جسمانی',
        experience: 6,
      },
    }),
    prisma.coach.create({
      data: {
        firstName: 'حسن',
        lastName: 'نوری',
        email: 'hassan.nouri@apfootball.com',
        phone: '09123456792',
        specialization: 'مربیگری حرفه‌ای',
        experience: 15,
      },
    }),
  ]);
  await Promise.all([
    prisma.schedule.create({
      data: {
        day: 'شنبه',
        time: '16:00 - 17:30',
      },
    }),
    prisma.schedule.create({
      data: {
        day: 'دوشنبه',
        time: '16:00 - 17:30',
      },
    }),

    prisma.schedule.create({
      data: {
        day: 'چهارشنبه',
        time: '16:00 - 17:30',
      },
    }),
  ]);

  // Create programs
  const programs = await Promise.all([
    prisma.program.create({
      data: {
        name: 'برنامه کودکان',
        description:
          'ایجاد مهارت‌های اساسی از طریق فعالیت‌های سرگرم‌کننده و جذاب طراحی شده برای بازیکنان جوان.',
        price: 6,
        period: 'ماه',
        duration: 3,
        ageRange: '8-12',
        ageGroup: '8-12',
        sessionCount: 12,
        maxStudents: 15,
        coachId: coaches[0].id,
        level: 'مبتدی',

        features: [
          'مهارت‌های حرکتی پایه',
          'بازی‌ها و فعالیت‌های تیمی',
          'توسعه هماهنگی',
          'آشنایی با قوانین بازی',
          'ارائه تجهیزات کامل',
          'محیط یادگیری شاد',
        ],
        color: 'from-blue-500 to-blue-600',
        icon: '⚽',
        popular: false,
        rating: 4.8,
        studentsEnrolled: 45,
      },
    }),
    prisma.program.create({
      data: {
        name: 'برنامه نوجوانان',
        ageRange: '13-17 سال',
        ageGroup: '13-17 سال',
        description:
          'تکنیک‌های پیشرفته و آموزش تاکتیکی برای بازیکنان جوان جدی که برای بازی رقابتی آماده هستند.',
        price: 8,
        period: 'ماه',
        duration: 4,
        sessionCount: 16,
        maxStudents: 12,
        coachId: coaches[0].id,
        level: 'متوسط',
        features: [
          'مهارت‌های فردی پیشرفته',
          'تاکتیک و استراتژی تیمی',
          'آمادگی جسمانی',
          'آموزش مهارت‌های ذهنی',
          'آماده‌سازی برای مسابقات',
          'تحلیل عملکرد',
        ],
        color: 'from-emerald-500 to-emerald-600',
        icon: '🏃',
        popular: true,
        rating: 4.9,
        studentsEnrolled: 38,
      },
    }),
  ]);

  // Create some sample sessions
  const sessions = await Promise.all([
    prisma.session.create({
      data: {
        name: 'تمرین تکنیک پایه',
        description: 'آموزش پاس، دریبل و کنترل توپ',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        duration: 90,
        location: 'زمین شماره 1',
        maxCapacity: 15,
        programId: programs[0].id,
        coachId: coaches[0].id,
      },
    }),
    prisma.session.create({
      data: {
        name: 'تمرین تاکتیکی',
        description: 'آموزش سیستم‌های بازی و موقعیت‌گیری',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
        duration: 120,
        location: 'زمین شماره 2',
        maxCapacity: 15,
        programId: programs[1].id,
        coachId: coaches[0].id,
      },
    }),
    prisma.session.create({
      data: {
        name: 'تمرین حرفه‌ای',
        description: 'تمرین شدید برای بازیکنان حرفه‌ای',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Three days later
        duration: 150,
        location: 'زمین اصلی',
        maxCapacity: 15,
        programId: programs[1].id,
        coachId: coaches[1].id,
      },
    }),
  ]);

  console.log('Database has been seeded with:');
  console.log(`- ${coaches.length} coaches`);
  console.log(`- ${programs.length} programs`);
  console.log(`- ${sessions.length} sessions`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
