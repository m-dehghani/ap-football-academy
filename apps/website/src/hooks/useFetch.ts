import { useState, useEffect, useCallback } from 'react';

interface UseFetchOptions<T> {
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (...args: any[]) => Promise<T | null>;
  refetch: (...args: any[]) => Promise<T | null>;
}

export function useFetch<T>(
  fetchFn: (...args: any[]) => Promise<T>,
  options: UseFetchOptions<T> = {}
): UseFetchResult<T> {
  const { immediate = true, onSuccess, onError } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFn(...args);
        setData(result);
        onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        onError?.(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchFn, onSuccess, onError]
  );

  const refetch = useCallback((...args: any[]) => execute(...args), [execute]);

  useEffect(() => {
    if (immediate) {
      let mounted = true;
      const runFetch = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await fetchFn();
          if (mounted) {
            setData(result);
            onSuccess?.(result);
          }
        } catch (err) {
          if (mounted) {
            const error = err instanceof Error ? err : new Error('Unknown error');
            setError(error);
            onError?.(error);
          }
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };
      runFetch();
      return () => { mounted = false; };
    }
    return undefined;
  }, [execute, immediate, fetchFn, onSuccess, onError]);

  return { data, loading, error, execute, refetch };
}

export function useAsync<T>(promise: Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    const runAsync = async () => {
      setLoading(true);
      try {
        const result = await promise;
        if (mounted) {
          setData(result);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    runAsync();
    return () => { mounted = false; };
  }, [promise]);

  return { data, loading, error };
}