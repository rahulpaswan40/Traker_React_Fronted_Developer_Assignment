import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export function useUrlParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = useCallback((key: string, defaultValue: string = ''): string => {
    return searchParams.get(key) || defaultValue;
  }, [searchParams]);

  const setParam = useCallback((key: string, value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value && value !== 'All' && value !== 'all') {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const setMultipleParams = useCallback((params: Record<string, string>) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== 'All' && value !== 'all') {
          next.set(key, value);
        } else {
          next.delete(key);
        }
      });
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  return { getParam, setParam, setMultipleParams, searchParams };
}
