import { useEffect, useState } from 'react';
import { validateSearch } from '@/utils/validation';

interface LoadOnScrollHookProps<T> {
  data: T[];
  setData: (data: T[]) => void;
  apiFunction: (skip: number, take: number, search?: string) => Promise<T[]>;
  take: number;
  searchEnabled: boolean;
}

function useLoadOnScroll<T>(props : LoadOnScrollHookProps<T>) {
  const { data, setData, apiFunction, take, searchEnabled } = props;
  
  const [skip, setSkip] = useState(0);
  const [query, setQuery] = useState(''); // search query
  const [loading, setLoading] = useState(false);
  const [eod, setEod] = useState(false); // end of data

  useEffect(() => {
    setLoading(true);

    apiFunction(skip, take, query).then((newData) => {
      // @ts-ignore
      setData(newData);
      setSkip(skip + take);
    })
    .catch((error) => {
      console.error(error);
      setData([]);
    })
    .finally(() => {
      setLoading(false);
    });

    return () => {
      setData([]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [skip, loading, eod]);

  const handleScroll = () => {
    let debounceTimer;

    if (loading || eod) {
      return;
    }

    // Calculate the position 50 pixels above the bottom
    const positionToTrigger = document.documentElement.scrollHeight - 50;

    // Check if the user has reached the position
    if (window.innerHeight + window.scrollY >= positionToTrigger) {
      setLoading(true);

      // Clear the previous debounce timer
      clearTimeout(debounceTimer);

      // Set a new debounce timer
      debounceTimer = setTimeout(() => {
        apiFunction(skip, take, query).then((newData) => {
          if (!newData.length) {
            setEod(true);
            setLoading(false);
            return;
          }

          setData([...data, ...newData]);
          setSkip(skip + take);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
      }, 500);
    }
  }

  const handleSearch = (query: string) => {
    if (!searchEnabled) return;

    if (!validateSearch(query)) {
      console.error('Invalid search query');
      return;
    }

    setLoading(true);
    setQuery(query);

    apiFunction(0, take, query).then((newData) => {
      setData(newData);
      setSkip(take);
      setEod(false);
    })
    .catch((error) => {
      console.error(error);
      setData([]);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return {
    data,
    loading,
    handleSearch,
  }
}

export default useLoadOnScroll;
