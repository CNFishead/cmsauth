import axios from '@/utils/axios';
import { message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import errorHandler from '@/utils/errorHandler';
import { useRouter } from 'next/navigation';
import decryptData from '@/utils/decryptData';

/**
 * @description Axio call to create or post data to api
 * @param formData
 * @returns
 */
const postFormData = async (url: string, formData: any) => {
  const { data } = await axios.post(url, formData); 
  
  // check if the payload is a string, if it is, its encrypted, decrypt it
  if (typeof data?.payload === 'string') {
    // parse the encrypted data, at data.payload, and return all of the original data as an object
    return { ...data, payload: decryptData(data.payload) };
  }
  return data;
};

/**
 * @description react-query hook to update a Certificate
 */
export default (options: {
  url: string;
  key: string;
  queriesToInvalidate?: string[];
  successMessage?: string;
  redirectUrl?: string;
  onSuccessCallback?: (data: any) => void;
  onErrorCallback?: (error: Error) => void;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation((data: any) => postFormData(options.url, data), {
    onSuccess: (data: any) => {
      message.success(options.successMessage || 'Data posted successfully');

      options.queriesToInvalidate?.forEach((query: string) => {
        queryClient.invalidateQueries([query]);
      });

      if (options.redirectUrl) {
        router.push(options.redirectUrl);
      }
      // Call optional onSuccess callback
      if (options.onSuccessCallback) {
        options.onSuccessCallback(data);
      }
    },
    onError: (error: Error) => {
      // Handle the error
      errorHandler(error);

      // Call optional onError callback
      if (options.onErrorCallback) {
        options.onErrorCallback(error);
      }
    },
  });
};
