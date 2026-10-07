import { getPrisma } from '@/lib/db';
import { SiteInfo } from '@/viewModels/site';

export async function getSiteInfo(): Promise<SiteInfo | null> {
  const prisma = await getPrisma();
  const [academy, hours, socialLinks, programs] = await Promise.all([
    prisma.academyInfo.findUnique({ where: { id: 'default' } }),
    prisma.openingHour.findMany({ orderBy: { displayOrder: 'asc' } }),
    prisma.socialLink.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
    }),
    prisma.program.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
      select: { id: true, name: true, ageRange: true },
    }),
  ]);

  if (!academy) return null;

  const toHour = ({ id, days, hours }: (typeof hours)[number]) => ({
    id,
    days,
    hours,
  });

  return {
    name: academy.name,
    tagline: academy.tagline,
    description: academy.description,
    phone: academy.phone,
    email: academy.email,
    privacyEmail: academy.privacyEmail,
    address: academy.address,
    city: academy.city,
    foundedYear: academy.foundedYear,
    officeHours: hours.filter((h) => h.type === 'OFFICE').map(toHour),
    trainingHours: hours.filter((h) => h.type === 'TRAINING').map(toHour),
    socialLinks: socialLinks.map(({ id, name, url, icon }) => ({
      id,
      name,
      url,
      icon,
    })),
    programLinks: programs,
  };
}
