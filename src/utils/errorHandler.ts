// import { logout } from '../state/auth';
import { useInterfaceStore } from '@/state/interface';
import { message } from 'antd';

/**
 * @description - This function is used to handle errors in the client application.
 *
 * @param {Error} error - The error object
 * @Author - Austin Howard
 * @lastModified - 2022-07-22
 * @modifiedBy - Austin Howard
 * @version - 1.0.0
 */
export default (error: any) => {
  const { addError } = useInterfaceStore();
  const messageTxt =
    error?.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  console.log(`fell into error handler: ${messageTxt}`);
  // message.error(messageTxt);
  addError({ type: 'error', message: messageTxt });
  return message;
};
