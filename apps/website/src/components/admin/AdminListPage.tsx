import React from 'react';
import { useFetch, useDelete } from '@/hooks';
import { coachRepository } from '@/lib/repositories';
import { Button } from '@/components/ui';
import { Table } from '@/components/ui';
import { Badge } from '@/components/ui';
import Link from 'next/link';

interface AdminListPageProps<T> {
  title: string;
  description: string;
  addHref: string;
  addLabel: string;
  columns: any[];
  fetchFn: () => Promise<T[]>;
  deleteFn?: (id: string) => Promise<any>;
  getRowActions: (item: T, deleteHooks: { handleDelete: (id: string) => Promise<boolean>; isDeleting: (id: string) => boolean }) => React.ReactNode;
  emptyMessage?: string;
  statusBadge?: (item: T) => React.ReactNode;
}

export function AdminListPage<T extends { id: string }>({
  title,
  description,
  addHref,
  addLabel,
  columns,
  fetchFn,
  deleteFn,
  getRowActions,
  emptyMessage = 'هیچ موردی یافت نشد',
  statusBadge,
}: AdminListPageProps<T>) {
  const { data, loading, error, refetch } = useFetch(fetchFn, { immediate: true });
  const deleteHooks = deleteFn ? useDelete(deleteFn) : { handleDelete: async () => false, isDeleting: () => false };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700" role="alert">
        خطا در بارگذاری داده‌ها: {error.message}
        <Button onClick={refetch} className="ml-4" variant="outline" size="sm">
          تلاش مجدد
        </Button>
      </div>
    );
  }

  const tableColumns = [
    ...columns,
    {
      key: 'actions',
      header: 'عملیات',
      render: (item: T) => getRowActions(item, deleteHooks),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        <Link
          href={addHref}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {addLabel}
        </Link>
      </div>

      {data && data.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <p className="text-gray-500">{emptyMessage}</p>
          <Link
            href={addHref}
            className="inline-flex items-center mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            ایجاد اولین مورد
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <Table
            columns={tableColumns}
            data={data || []}
            keyExtractor={item => item.id}
            emptyMessage={emptyMessage}
          />
        </div>
      )}
    </div>
  );
}

// Specialized list pages for each entity
export function CoachesListPage() {
  return (
    <AdminListPage
      title="مربیان"
      description="مدیریت و مشاهده تمام مربیان آکادمی"
      addHref="/admin/coaches/new"
      addLabel="افزودن مربی جدید"
      columns={[
        {
          key: 'coach',
          header: 'مربی',
          render: (item: any) => (
            <div className="flex items-center">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold mr-3">
                {(item.firstName?.charAt(0) || '') + (item.lastName?.charAt(0) || '')}
              </div>
              <div>
                <div className="font-medium text-gray-900">{item.firstName} {item.lastName}</div>
                <div className="text-sm text-gray-500">{item.email}</div>
              </div>
            </div>
          ),
        },
        {
          key: 'specialization',
          header: 'تخصص',
          render: (item: any) => item.specialization,
        },
        {
          key: 'experience',
          header: 'تجربه',
          render: (item: any) => `${item.experience} سال`,
        },
        {
          key: 'programs',
          header: 'برنامه‌ها',
          render: (item: any) => `${item.programs?.length || 0} برنامه`,
        },
        {
          key: 'rating',
          header: 'امتیاز',
          render: (item: any) => (
            <div className="flex items-center">
              <span className="text-gray-900 font-medium">{item.rating}</span>
              <svg className="w-4 h-4 text-yellow-400 fill-current ml-1" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          ),
        },
        {
          key: 'studentsCount',
          header: 'دانش‌آموزان',
          render: (item: any) => item.studentsCount,
        },
        {
          key: 'status',
          header: 'وضعیت',
          render: (item: any) => (
            <Badge variant={item.isActive ? 'success' : 'default'}>
              {item.isActive ? 'فعال' : 'غیرفعال'}
            </Badge>
          ),
        },
      ]}
      fetchFn={() => coachRepository.findAll()}
      deleteFn={id => coachRepository.delete(id)}
      getRowActions={(item: any, deleteHooks: any) => (
        <div className="flex items-center space-x-2 space-x-reverse">
          <Link
            href={`/admin/coaches/${item.id}`}
            className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            title="مشاهده/ویرایش"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => deleteHooks.handleDelete(item.id)}
            disabled={deleteHooks.isDeleting(item.id)}
            aria-label="حذف"
          >
            {deleteHooks.isDeleting(item.id) ? (
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
          </Button>
        </div>
      )}
    />
  );
}