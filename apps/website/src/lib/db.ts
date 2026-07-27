import { PrismaClient } from '../../prisma/generated/client';

let prismaInstance: PrismaClient | null = null;

export async function getPrisma(): Promise<PrismaClient> {
  if (prismaInstance) return prismaInstance;

  // Only import the pg adapter on the server side
  const { PrismaPg } = await import('@prisma/adapter-pg');
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  prismaInstance = new PrismaClient({ adapter });
  return prismaInstance;
}

// For backward compatibility - use getPrisma() in new code
export const prisma = getPrisma();
