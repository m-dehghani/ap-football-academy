/**
 * Server-only Prisma client initialization.
 * This file must NEVER be statically imported from client-side code.
 * For new code, prefer using db-server.ts with dynamic imports.
 */

let prismaInstance: any = null;

export async function getPrisma(): Promise<any> {
  if (prismaInstance) return prismaInstance;

  // All Prisma imports are dynamic to prevent Node.js modules from being bundled for the browser
  const { PrismaClient } = await import('../../prisma/generated/client');
  const { PrismaPg } = await import('@prisma/adapter-pg');
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  prismaInstance = new PrismaClient({ adapter });
  return prismaInstance;
}

// Legacy export for API routes that import { prisma } from '../../lib/db'
export const prisma = getPrisma();
