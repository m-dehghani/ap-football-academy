// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';
import handler from '@/pages/api/student/profile';
import { authorizeStudent } from '@/lib/auth';
import { getPrisma } from '@/lib/db';

vi.mock('@/lib/auth', () => ({
  authorizeStudent: vi.fn(),
  normalizePhone: (value: string) => value.replace(/[^\d+]/g, ''),
}));
vi.mock('@/lib/db', () => ({ getPrisma: vi.fn() }));

const mockPrisma = {
  user: { findFirst: vi.fn(), update: vi.fn() },
  coach: { findFirst: vi.fn() },
};

const request = (body: Record<string, unknown>) =>
  ({ method: 'PATCH', body }) as never;
const response = () =>
  ({
    setHeader: vi.fn(),
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  }) as never as {
    setHeader: ReturnType<typeof vi.fn>;
    status: ReturnType<typeof vi.fn>;
    json: ReturnType<typeof vi.fn>;
  };

describe('/api/student/profile', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(authorizeStudent).mockResolvedValue('student-1');
    vi.mocked(getPrisma).mockResolvedValue(mockPrisma as never);
    mockPrisma.user.findFirst.mockResolvedValue(null);
    mockPrisma.coach.findFirst.mockResolvedValue(null);
    mockPrisma.user.update.mockResolvedValue({
      id: 'student-1',
      email: 'student@example.com',
      firstName: 'Student',
      lastName: 'User',
      phone: '09123456789',
      birthDate: new Date('2012-01-01T00:00:00.000Z'),
    });
  });

  it('updates profile fields and normalizes the phone number', async () => {
    const res = response();

    await handler(
      request({
        firstName: 'Student',
        lastName: 'User',
        email: 'STUDENT@example.com',
        phone: '0912 345 6789',
        birthDate: '2012-01-01',
      }),
      res as never,
    );

    expect(mockPrisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'student-1' },
        data: expect.objectContaining({
          email: 'student@example.com',
          phone: '09123456789',
          birthDate: new Date('2012-01-01T00:00:00.000Z'),
        }),
      }),
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('requires at least an email address or phone number', async () => {
    const res = response();

    await handler(
      request({
        firstName: 'Student',
        lastName: 'User',
        email: '',
        phone: '',
        birthDate: '',
      }),
      res as never,
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockPrisma.user.update).not.toHaveBeenCalled();
  });
});
