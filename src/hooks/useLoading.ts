import { useCallback, useState } from 'react';

type UseLoadingReturn = {
  isLoading: boolean;
  state: {
    start: () => void;
    stop: () => void;
  };
};

export function useLoading(initialState = false): UseLoadingReturn {
  const [loading, setLoading] = useState(initialState);

  const start = useCallback(() => setLoading(true), [setLoading]);

  const stop = useCallback(() => setLoading(false), [setLoading]);

  return {
    isLoading: loading,
    state: {
      start,
      stop,
    },
  };
}
