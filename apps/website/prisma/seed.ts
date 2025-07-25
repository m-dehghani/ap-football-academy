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
        experience: 8
      }
    }),
    prisma.coach.create({
      data: {
        firstName: 'محمد',
        lastName: 'رضایی',
        email: 'mohammad.rezaei@apfootball.com',
        phone: '09123456790',
        specialization: 'آموزش بزرگسالان و تاکتیک',
        experience: 12
      }
    }),
    prisma.coach.create({
      data: {
        firstName: 'علی',
        lastName: 'احمدی',
        email: 'ali.ahmadi@apfootball.com',
        phone: '09123456791',
        specialization: 'آماده‌سازی جسمانی',
        experience: 6
      }
    }),
    prisma.coach.create({
      data: {
        firstName: 'حسن',
        lastName: 'نوری',
        email: 'hassan.nouri@apfootball.com',
        phone: '09123456792',
        specialization: 'مربیگری حرفه‌ای',
        experience: 15
      }
    })
  ]);

  // Create programs
  const programs = await Promise.all([
    prisma.program.create({
      data: {
        name: 'برنامه کودکان',
        description: 'آموزش پایه و تکنیک‌های اولیه فوتبال برای پسران کودک',
        ageGroup: '8-12',
        price: 250000,
        duration: 3,
        sessionCount: 12,
        maxStudents: 15,
        coachId: coaches[0].id
      }
    }),
    prisma.program.create({
      data: {
        name: 'برنامه نوجوانان',
        description: 'توسعه مهارت‌های فنی و تاکتیکی برای نوجوانان پسر',
        ageGroup: '13-17',
        price: 350000,
        duration: 4,
        sessionCount: 16,
        maxStudents: 15,
        coachId: coaches[0].id
      }
    }),
    prisma.program.create({
      data: {
        name: 'برنامه بزرگسالان',
        description: 'آموزش حرفه‌ای و تخصصی برای مردان جوان',
        ageGroup: '18-25',
        price: 450000,
        duration: 5,
        sessionCount: 20,
        maxStudents: 15,
        coachId: coaches[1].id
      }
    }),
    prisma.program.create({
      data: {
        name: 'برنامه استادان',
        description: 'حفظ آمادگی و تکنیک برای مردان با تجربه',
        ageGroup: '26-30',
        price: 300000,
        duration: 3,
        sessionCount: 12,
        maxStudents: 15,
        coachId: coaches[3].id
      }
    })
  ]);

  // Create some sample sessions
  const now = new Date();
  const sessions = await Promise.all([
    prisma.session.create({
      data: {
        name: 'تمرین تکنیک پایه',
        description: 'آموزش پاس، دریبل و کنترل توپ',
        date: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
        duration: 90,
        location: 'زمین شماره 1',
        maxCapacity: 15,
        programId: programs[0].id,
        coachId: coaches[0].id
      }
    }),
    prisma.session.create({
      data: {
        name: 'تمرین تاکتیکی',
        description: 'آموزش سیستم‌های بازی و موقعیت‌گیری',
        date: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
        duration: 120,
        location: 'زمین شماره 2',
        maxCapacity: 15,
        programId: programs[1].id,
        coachId: coaches[0].id
      }
    }),
    prisma.session.create({
      data: {
        name: 'تمرین حرفه‌ای',
        description: 'تمرین شدید برای بازیکنان حرفه‌ای',
        date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // Three days later
        duration: 150,
        location: 'زمین اصلی',
        maxCapacity: 15,
        programId: programs[2].id,
        coachId: coaches[1].id
      }
    })
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