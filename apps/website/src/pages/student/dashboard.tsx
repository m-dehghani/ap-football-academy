import React, { FormEvent, useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';

interface Registration {
  id: string;
  status: string;
  totalAmount: number;
  paidAmount: number;
  payments: { status: string }[];
  program: {
    id: string;
    name: string;
    coach: { firstName: string; lastName: string } | null;
  };
}

interface DashboardStudent {
  id: string;
  email: string | null;
  firstName: string;
  lastName: string;
  phone: string | null;
  birthDate: string | null;
  registrations: Registration[];
}

interface DashboardProgram {
  id: string;
  name: string;
  price: number;
  minAge: number;
  maxAge: number;
}

interface StudentDashboardProps {
  student: DashboardStudent;
  programs: DashboardProgram[];
}

interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
}

const activeStatuses = new Set(['PENDING', 'APPROVED']);
const formatPrice = (amount: number) =>
  `${new Intl.NumberFormat('fa-IR').format(amount)} تومان`;

const registrationStatus: Record<string, string> = {
  PENDING: 'در انتظار تأیید',
  APPROVED: 'تأیید شده',
  CANCELLED: 'لغو شده',
  COMPLETED: 'تکمیل شده',
};

const StudentDashboardPage: React.FC<StudentDashboardProps> = ({
  student,
  programs,
}) => {
  const { user, loading, logout, refreshUser } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileForm>({
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email ?? '',
    phone: student.phone ?? '',
    birthDate: student.birthDate?.slice(0, 10) ?? '',
  });
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'STUDENT')) {
      void router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'STUDENT') {
    return (
      <Layout title="در حال بارگذاری...">
        <div className="min-h-screen flex items-center justify-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"
            role="status"
            aria-label="در حال بارگذاری"
          />
        </div>
      </Layout>
    );
  }

  const activeRegistrations = student.registrations.filter((registration) =>
    activeStatuses.has(registration.status),
  );
  const totalDue = student.registrations
    .filter((registration) => registration.status !== 'CANCELLED')
    .reduce(
      (amount, registration) =>
        amount +
        Math.max(registration.totalAmount - registration.paidAmount, 0),
      0,
    );
  const enrolledProgramIds = new Set(
    activeRegistrations.map((registration) => registration.program.id),
  );
  const availablePrograms = programs.filter(
    (program) => !enrolledProgramIds.has(program.id),
  );
  const paymentOutcome =
    typeof router.query.payment === 'string' ? router.query.payment : '';
  const paymentMessage =
    paymentOutcome === 'success'
      ? 'پرداخت با موفقیت تأیید شد.'
      : paymentOutcome === 'cancelled'
        ? 'پرداخت لغو شد و مبلغی از حساب شما کسر نشده است.'
        : '';
  const paymentError =
    paymentOutcome === 'refund-required'
      ? 'پرداخت دریافت شد اما به ثبت‌نام لغوشده مربوط است؛ برای پیگیری بازپرداخت با آکادمی تماس بگیرید.'
      : paymentOutcome && !['success', 'cancelled'].includes(paymentOutcome)
        ? 'تأیید پرداخت انجام نشد. وضعیت پرداخت را از پنل بررسی کنید یا با آکادمی تماس بگیرید.'
        : '';

  const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusyAction('profile');
    setError('');
    setMessage('');
    try {
      const response = await fetch('/api/student/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'ذخیره پروفایل ناموفق بود');
      setProfile({
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        email: result.user.email ?? '',
        phone: result.user.phone ?? '',
        birthDate: result.user.birthDate?.slice(0, 10) ?? '',
      });
      await refreshUser();
      setMessage('اطلاعات پروفایل ذخیره شد.');
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'ذخیره پروفایل ناموفق بود',
      );
    } finally {
      setBusyAction(null);
    }
  };

  const handleEnrollment = async (programId: string) => {
    setBusyAction(`enroll:${programId}`);
    setError('');
    setMessage('');
    try {
      const response = await fetch('/api/student/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ programId }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'ثبت‌نام ناموفق بود');
      setMessage(`درخواست ثبت‌نام در «${result.program.name}» ارسال شد.`);
      await router.replace(router.asPath);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'ثبت‌نام ناموفق بود',
      );
    } finally {
      setBusyAction(null);
    }
  };

  const handleCancellation = async (registrationId: string) => {
    setBusyAction(`cancel:${registrationId}`);
    setError('');
    setMessage('');
    try {
      const response = await fetch('/api/student/registrations', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'لغو ثبت‌نام ناموفق بود');
      setMessage(result.message);
      await router.replace(router.asPath);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'لغو ثبت‌نام ناموفق بود',
      );
    } finally {
      setBusyAction(null);
    }
  };

  const handlePayment = async () => {
    setBusyAction('payment');
    setError('');
    setMessage('');
    try {
      const response = await fetch('/api/student/payments', { method: 'POST' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'ایجاد پرداخت ناموفق بود');
      window.location.assign(result.paymentUrl);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'ایجاد پرداخت ناموفق بود',
      );
      setBusyAction(null);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (logoutError) {
      console.error('Student logout error:', logoutError);
      setError('خروج ناموفق بود؛ لطفاً دوباره تلاش کنید.');
    }
  };

  return (
    <Layout
      title="پنل دانش‌آموز - آکادمی فوتبال AP"
      description="مدیریت اطلاعات، ثبت‌نام‌ها و پرداخت‌های دانش‌آموز"
      noindex={true}
    >
        <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-bold text-gray-900">پنل دانش‌آموز</h1>
              <div className="flex items-center gap-4">
                <span className="text-gray-700">
                  {profile.firstName} {profile.lastName}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  خروج
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {(message || paymentMessage) && (
            <p
              role="status"
              className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800"
            >
              {message || paymentMessage}
            </p>
          )}
          {(error || paymentError) && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
            >
              {error || paymentError}
            </p>
          )}

          <section className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4 rounded-t-lg">
              <h2 className="text-white text-lg font-semibold">اطلاعات پروفایل</h2>
            </div>
            <form onSubmit={handleProfileSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="block text-sm font-medium text-gray-700">
                  نام
                  <input
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="given-name"
                    value={profile.firstName}
                    onChange={(event) =>
                      setProfile({ ...profile, firstName: event.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  نام خانوادگی
                  <input
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="family-name"
                    value={profile.lastName}
                    onChange={(event) =>
                      setProfile({ ...profile, lastName: event.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  ایمیل (حداقل ایمیل یا تلفن لازم است)
                  <input
                    type="email"
                    autoComplete="email"
                    value={profile.email}
                    onChange={(event) =>
                      setProfile({ ...profile, email: event.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  تلفن (حداقل ایمیل یا تلفن لازم است)
                  <input
                    type="tel"
                    autoComplete="tel"
                    value={profile.phone}
                    onChange={(event) =>
                      setProfile({ ...profile, phone: event.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  تاریخ تولد (برای ثبت‌نام الزامی است)
                  <input
                    type="date"
                    value={profile.birthDate}
                    onChange={(event) =>
                      setProfile({ ...profile, birthDate: event.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>
              </div>
              <button
                type="submit"
                disabled={busyAction === 'profile'}
                className="mt-5 rounded-lg bg-primary-600 px-5 py-2 text-white hover:bg-primary-700 disabled:opacity-60"
              >
                {busyAction === 'profile' ? 'در حال ذخیره...' : 'ذخیره اطلاعات'}
              </button>
            </form>
          </section>

          <section className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4 rounded-t-lg flex flex-wrap justify-between items-center gap-3">
              <h2 className="text-white text-lg font-semibold">ثبت‌نام‌های من</h2>
              <Link
                href="/programs"
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                مشاهده همه برنامه‌ها
              </Link>
            </div>
            <div className="p-6">
              {student.registrations.length === 0 ? (
                <p className="py-6 text-center text-gray-600">
                  هنوز در برنامه‌ای ثبت‌نام نکرده‌اید.
                </p>
              ) : (
                <div className="space-y-4">
                  {student.registrations.map((registration) => {
                    const due = Math.max(
                      registration.status === 'CANCELLED'
                        ? 0
                        : registration.totalAmount - registration.paidAmount,
                      0,
                    );
                    const canCancel =
                      activeStatuses.has(registration.status) &&
                      registration.paidAmount === 0 &&
                      !registration.payments.some((payment) =>
                        ['PENDING', 'COMPLETED', 'REFUND_REQUIRED'].includes(
                          payment.status,
                        ),
                      );
                    return (
                      <article
                        key={registration.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {registration.program.name}
                            </h3>
                            <p className="text-gray-600 mt-1">
                              مربی:{' '}
                              {registration.program.coach
                                ? `${registration.program.coach.firstName} ${registration.program.coach.lastName}`
                                : '—'}
                            </p>
                            <p className="text-gray-600 mt-1">
                              وضعیت: {registrationStatus[registration.status] ?? registration.status}
                            </p>
                            <p className="text-gray-600 mt-1">
                              شهریه: {formatPrice(registration.totalAmount)} • پرداخت‌شده:{' '}
                              {formatPrice(registration.paidAmount)} • مانده:{' '}
                              {formatPrice(due)}
                            </p>
                          </div>
                          {canCancel && (
                            <button
                              type="button"
                              disabled={busyAction === `cancel:${registration.id}`}
                              onClick={() => void handleCancellation(registration.id)}
                              className="rounded-lg border border-red-300 px-4 py-2 text-red-700 hover:bg-red-50 disabled:opacity-60"
                            >
                              {busyAction === `cancel:${registration.id}`
                                ? 'در حال لغو...'
                                : 'لغو ثبت‌نام'}
                            </button>
                          )}
                        </div>
                        {activeStatuses.has(registration.status) && !canCancel && (
                          <p className="mt-3 text-sm text-gray-600">
                            برای لغو ثبت‌نامی که پرداخت آن آغاز یا انجام شده است،{' '}
                            <Link
                              href="/contact"
                              className="text-primary-700 underline"
                            >
                              با آکادمی تماس بگیرید
                            </Link>
                            .
                          </p>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}

              {availablePrograms.length > 0 && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    ثبت‌نام در برنامه جدید
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    ثبت‌نام بر اساس تاریخ تولد ثبت‌شده بررسی می‌شود و محدوده سنی هر برنامه الزامی است.
                  </p>
                  <ul className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {availablePrograms.map((program) => (
                      <li
                        key={program.id}
                        className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-4"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">{program.name}</p>
                          <p className="text-sm text-gray-600">
                            {program.minAge} تا {program.maxAge} سال •{' '}
                            {formatPrice(program.price)}
                          </p>
                        </div>
                        <button
                          type="button"
                          disabled={busyAction === `enroll:${program.id}`}
                          onClick={() => void handleEnrollment(program.id)}
                          className="shrink-0 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:opacity-60"
                        >
                          {busyAction === `enroll:${program.id}`
                            ? 'در حال ثبت‌نام...'
                            : 'ثبت‌نام'}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">پرداخت شهریه</h2>
                <p className="mt-1 text-gray-600">
                  مانده شهریه برنامه‌های فعال: {formatPrice(totalDue)}
                </p>
              </div>
              <button
                type="button"
                disabled={totalDue <= 0 || busyAction === 'payment'}
                onClick={() => void handlePayment()}
                className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busyAction === 'payment' ? 'در حال انتقال...' : 'پرداخت از طریق زرین‌پال'}
              </button>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              پرداخت برای تمام مانده برنامه‌های فعال به‌صورت یکجا انجام می‌شود.
            </p>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  StudentDashboardProps
> = async (context) => {
  const token = context.req.cookies.auth_token;
  if (!token) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  try {
    const [{ jwtVerify }, { getJwtSecret }, { getPrisma }] = await Promise.all([
      import('jose'),
      import('@/lib/auth'),
      import('@/lib/db'),
    ]);
    const { payload } = await jwtVerify(token, getJwtSecret());
    if (typeof payload.userId !== 'string') {
      return { redirect: { destination: '/login', permanent: false } };
    }

    const db = await getPrisma();
    const [student, programs] = await Promise.all([
      db.user.findUnique({
        where: { id: payload.userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          birthDate: true,
          role: true,
          registrations: {
            select: {
              id: true,
              status: true,
              totalAmount: true,
              paidAmount: true,
              payments: { select: { status: true } },
              program: {
                select: {
                  id: true,
                  name: true,
                  coach: {
                    select: { firstName: true, lastName: true },
                  },
                },
              },
            },
            orderBy: { registeredAt: 'desc' },
          },
        },
      }),
      db.program.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          price: true,
          minAge: true,
          maxAge: true,
        },
        orderBy: { displayOrder: 'asc' },
      }),
    ]);

    if (!student || student.role !== 'STUDENT') {
      return { redirect: { destination: '/login', permanent: false } };
    }

    return {
      props: {
        student: {
          ...student,
          birthDate: student.birthDate?.toISOString() ?? null,
        },
        programs,
      },
    };
  } catch (error) {
    console.error('Student dashboard load error:', error);
    return { redirect: { destination: '/login', permanent: false } };
  }
};

export default StudentDashboardPage;
