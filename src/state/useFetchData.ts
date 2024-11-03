import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useSearchStore as store } from './search/search';
import decryptData from '@/utils/decryptData';

const fetchData = async (options?: {
  url?: string;
  defaultKeyword?: string;
  defaultPageNumber?: number;
  defaultPageLimit?: number;
  defaultFilter?: string;
  defaultSort?: string;
}) => {
  const keyword = options?.defaultKeyword || store.getState().search;
  const pageNumber = options?.defaultPageNumber || store.getState().pageNumber;
  const pageLimit = options?.defaultPageLimit || store.getState().pageLimit; // Fix: Use defaultPageLimit here
  const filter = options?.defaultFilter || store.getState().filter;
  const sort = options?.defaultSort || store.getState().sort;

  const { data } = await axios.get(
    `${options?.url}?keyword=${keyword}&pageNumber=${pageNumber}&limit=${pageLimit}&filterOptions=${filter}&sortBy=${sort}`
  );
  // check if the payload is a string, if it is, its encrypted, decrypt it
  if (typeof data?.payload === 'string') {
    // parse the encrypted data, at data.payload, and return all of the original data as an object
    return { ...data, payload: decryptData(data.payload) }; 
  }
  return data;
};

/**
 * @description - custom hook to retrieve user videos from the api
 * @param keyword - search keyword
 * @param pageNumber - page number, used for pagination
 * @param onSuccess  - callback function to be called on success
 * @param onError - callback function to be called on error
 * @returns  - returns the query object
 *
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 */
export default (options?: {
  key: string | string[];
  url?: string;
  enabled?: boolean;
  keyword?: string;
  pageNumber?: number;
  pageLimit?: number;
  filter?: string;
  sort?: string;
  refetchOnWindowFocus?: boolean;
  // onSuccess is a callback function that will be called on success, to do something with the data
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const query = useQuery(
    [
      typeof options?.key === 'string'
        ? options?.key
        : // if its an array, remove the array, return both elements as separate strings
          options?.key[0],
      options?.key[1],
    ],
    () =>
      fetchData({
        url: options?.url,
        defaultFilter: options?.filter,
        defaultKeyword: options?.keyword,
        defaultPageLimit: options?.pageLimit,
        defaultPageNumber: options?.pageNumber,
        defaultSort: options?.sort,
      }),
    {
      onSuccess: options?.onSuccess,
      // refetchInterval: 2000,
      retry: 1,
      onError: options?.onError,
      enabled: options?.enabled,
      refetchOnWindowFocus: options?.refetchOnWindowFocus || false,
    }
  );
  return query;
};
