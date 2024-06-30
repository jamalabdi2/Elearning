import { useEffect, useState } from 'react';
import { store } from '@/redux/store';
import { apiSlice } from '@/redux/features/api/apiSlice';

export const useInitializeApp = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      await store.dispatch(
        apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
      );
      await store.dispatch(
        apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
      );
      setIsInitialized(true);
    };

    initializeApp();
  }, []);

  return isInitialized;
};
