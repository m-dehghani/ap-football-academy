import { useState, useCallback } from 'react';
import { useFetch } from './useFetch';

interface UseDeleteOptions<T> {
  onSuccess?: (deletedId: string, data: T) => void;
  onError?: (error: Error) => void;
}

export function useDelete<T>(
  deleteFn: (id: string) => Promise<T>,
  options: UseDeleteOptions<T> = {}
) {
  const { execute: deleteItem, loading, error } = useFetch(deleteFn, {
    immediate: false,
    onSuccess: data => options.onSuccess?.(data as any, data),
    onError: options.onError,
  });

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = useCallback(
    async (id: string, confirmMessage = 'آیا از حذف مطمئن هستید؟') => {
      if (!window.confirm(confirmMessage)) return false;
      
      setDeletingId(id);
      const result = await deleteItem(id);
      setDeletingId(null);
      return result !== null;
    },
    [deleteItem]
  );

  return {
    handleDelete,
    loading,
    error,
    deletingId,
    isDeleting: (id: string) => deletingId === id,
  };
}