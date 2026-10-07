import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';


interface ProgramFormPageProps {}

const ProgramFormPage: React.FC<ProgramFormPageProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    sessionCount: '',
    maxStudents: '15',
    popular: false,
    icon: '⚽',
    ageRange: '8-12 سال',
    minAge: '8',
    maxAge: '12',
    color: '#3B82F6',
    period: 'ماهانه',
    rating: '4.5',
    studentsEnrolled: '0',
    features: '',
    level: 'BEGINNER',
    coachId: '',
    schedule: [{ day: '', time: '', displayOrder: 0 }],
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      fetchProgram();
    }
  }, [id]);

  const fetchProgram = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/programs/${id}`);
      if (!res.ok) throw new Error('برنامه یافت نشد');
      const program = await res.json();
      setFormData({
        name: program.name,
        description: program.description,
        price: program.price.toString(),
        duration: program.duration.toString(),
        sessionCount: program.sessionCount.toString(),
        maxStudents: program.maxStudents.toString(),
        popular: program.popular,
        icon: program.icon,
        ageRange: program.ageRange,
        minAge: program.minAge.toString(),
        maxAge: program.maxAge.toString(),
        color: program.color,
        period: program.period,
        rating: program.rating.toString(),
        studentsEnrolled: program.studentsEnrolled.toString(),
        features: program.features.join(', '),
        level: program.level,
        coachId: program.coachId || '',
        schedule: program.schedule.map((s: any, i: number) => ({
          day: s.day,
          time: s.time,
          displayOrder: s.displayOrder ?? i,
        })),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در بارگذاری');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };

  const addSchedule = () => {
    setFormData(prev => ({
      ...prev,
      schedule: [...prev.schedule, { day: '', time: '', displayOrder: prev.schedule.length }],
    }));
  };

  const removeSchedule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index),
    }));
  };

  const handleScheduleChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.map((s, i) => i === index ? { ...s, [field]: value } : s),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const data = {
        ...formData,
        price: parseInt(formData.price),
        duration: parseInt(formData.duration),
        sessionCount: parseInt(formData.sessionCount),
        maxStudents: parseInt(formData.maxStudents),
        minAge: parseInt(formData.minAge),
        maxAge: parseInt(formData.maxAge),
        rating: parseFloat(formData.rating),
        studentsEnrolled: parseInt(formData.studentsEnrolled),
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
        schedule: formData.schedule.filter(s => s.day && s.time),
      };

      const url = isEditing ? `/api/admin/programs/${id}` : '/api/admin/programs';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('خطا در ذخیره');
      router.push('/admin/programs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در ذخیره');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title={isEditing ? 'ویرایش برنامه' : 'برنامه جدید'}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
        </div>
      </AdminLayout>
    );
  }

  const days = [
    { value: 'شنبه', label: 'شنبه' },
    { value: 'یک‌شنبه', label: 'یک‌شنبه' },
    { value: 'دوشنبه', label: 'دوشنبه' },
    { value: 'سه‌شنبه', label: 'سه‌شنبه' },
    { value: 'چهارشنبه', label: 'چهارشنبه' },
    { value: 'پنج‌شنبه', label: 'پنج‌شنبه' },
    { value: 'جمعه', label: 'جمعه' },
  ];

  const levels = [
    { value: 'BEGINNER', label: 'مبتدی' },
    { value: 'INTERMEDIATE', label: 'متوسط' },
    { value: 'ADVANCED', label: 'پیشرفته' },
  ];

  return (
    <AdminLayout title={isEditing ? 'ویرایش برنامه' : 'برنامه جدید'}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{isEditing ? 'ویرایش برنامه' : 'برنامه جدید'}</h1>
            <p className="text-gray-600 mt-1">اطلاعات برنامه را تکمیل کنید</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Basic Info */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">اطلاعات اصلی</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نام برنامه *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="مثال: فصل فوتبال نوجوانان"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">مربی *</label>
                <select
                  name="coachId"
                  value={formData.coachId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">انتخاب مربی</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">توضیحات *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="توضیحات کامل برنامه..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">آیکون</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="⚽"
                  maxLength={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">سطح</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {levels.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
              </div>
            </div>
          </section>

          {/* Pricing & Duration */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">قیمت و مدت زمان</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">قیمت (تومان) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">مدت (ماه) *</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تعداد جلسات *</label>
                <input
                  type="number"
                  name="sessionCount"
                  value={formData.sessionCount}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">حداکثر دانش‌آموز</label>
                <input
                  type="number"
                  name="maxStudents"
                  value={formData.maxStudents}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">دوره</label>
                <input
                  type="text"
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="ماهانه"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">امتیاز</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  max="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </section>

          {/* Age Range */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">بازه سنی</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">برچسب بازه سنی</label>
                <input
                  type="text"
                  name="ageRange"
                  value={formData.ageRange}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="8-12 سال"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">حداقل سن</label>
                <input
                  type="number"
                  name="minAge"
                  value={formData.minAge}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">حداکثر سن</label>
                <input
                  type="number"
                  name="maxAge"
                  value={formData.maxAge}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </section>

          {/* Features & Color */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">ویژگی‌ها و ظاهر</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">ویژگی‌ها (با کاما جدا کنید)</label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="مثال: تمرینات تکنیک, تمرینات تاکتیک, بازی دوستانه"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رنگ تم</label>
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </section>

          {/* Schedule */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">برنامه هفتگی</h2>
              <button type="button" onClick={addSchedule} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                + افزودن روز
              </button>
            </div>
            <div className="space-y-4">
              {formData.schedule.map((s, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">روز</label>
                    <select
                      value={s.day}
                      onChange={e => handleScheduleChange(i, 'day', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">انتخاب روز</option>
                      {days.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">ساعت</label>
                    <input
                      type="time"
                      value={s.time}
                      onChange={e => handleScheduleChange(i, 'time', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700 mb-1">ترتیب</label>
                    <input
                      type="number"
                      value={s.displayOrder}
                      onChange={e => handleScheduleChange(i, 'displayOrder', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeSchedule(i)}
                      disabled={formData.schedule.length === 1}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Status */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">وضعیت</h2>
            <div className="flex items-center space-x-4 space-x-reverse">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="popular"
                  checked={formData.popular}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-gray-700">برنامه محبوب</span>
              </label>
            </div>
          </section>

          {/* Actions */}
          <div className="flex justify-end space-x-4 space-x-reverse pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  ذخیره...
                </span>
              ) : isEditing ? (
                'ذخیره تغییرات'
              ) : (
                'ایجاد برنامه'
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProgramFormPage;