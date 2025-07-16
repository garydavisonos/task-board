import { useEffect } from 'react';
import useListStore from '@/resources/stores/listStore';

const useHydrateStore = () => {
  const setHydrated = useListStore((state) => state.setHydrated);

  useEffect(() => {
    setHydrated();
  }, [setHydrated]);
};

export default useHydrateStore;
