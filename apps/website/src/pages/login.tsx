import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '@/components/Layout';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('ایمیل نامعتبر است'),
  password: z.string().min(1, 'رمز عبور الزامی است'),
  role: z.enum(['STUDENT', 'COACH', 'ADMIN']),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'COACH' | 'ADMIN'>('STUDENT');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: 'STUDENT' },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password, data.role);
      toast.success('ورود با موفقیت انجام شد');
    } catch (error: any) {
      toast.error(error.message || 'خطا در ورود');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout
      title="ورود - آکادمی فوتبال AP"
      description="ورود به پنل کاربری آکادمی فوتبال AP"
      canonical="https://ap-football.com/login"
    >
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-primary-600 to-primary-700 px-8 py-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2">
                  ورود به حساب کاربری
                </h1>
                <p className="text-primary-100">برای دسترسی به پنل خود وارد شوید</p>
              </div>
            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    نوع حساب کاربری
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['STUDENT', 'COACH', 'ADMIN'] as const).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          selectedRole === role
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <span className="block text-sm font-medium">
                          {role === 'STUDENT' && 'دانش‌آموز'}
                          {role === 'COACH' && 'مربی'}
                          {role === 'ADMIN' && 'مدیر'}
                        </span>
                      </button>
                    ))}
                  </div>
                  <input type="hidden" {...register('role')} value={selectedRole} />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ایمیل *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="ایمیل خود را وارد کنید"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رمز عبور *
                  </label>
                  <input
                    type="password"
                    {...register('password')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="رمز عبور خود را وارد کنید"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'در حال ورود...' : 'ورود'}
                </button>

                {/* Links */}
                <div className="text-center space-y-2">
                  <Link
                    href="/register"
                    className="text-primary-600 hover:text-primary-700 text-sm"
                  >
                    هنوز حساب کاربری ندارید؟ ثبت نام کنید
                  </Link>
                  <Link
                    href="/forgot-password"
                    className="text-primary-600 hover:text-primary-700 text-sm"
                  >
                    رمز عبور را فراموش کرده‌اید؟
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;