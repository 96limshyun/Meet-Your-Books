import { useEffect } from 'react';

import useGenerateQuery from './useGenerateQuery';

const useBookLogic = () => {
    const query = useGenerateQuery();

    useEffect(() => {
        console.log(query)
    }, [query])
  return {
    query
  }
}

export default useBookLogic