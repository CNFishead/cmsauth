//Use react-query to fetch data from the server
import axios from '@/utils/axios';
import errorHandler from '@/utils/errorHandler';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useUserStore } from '../user';
import { message } from 'antd';
import { useInterfaceStore } from '../interface';
import { useRouter } from 'next/navigation';
import { usePartnerStore } from '../partner';

const login = async (options: { email: string; password: string }) => {
  //call api
  const { data } = await axios.post(`/auth/login`, {
    email: options.email,
    password: options.password,
  });
  //get token
  const user = data.user;
  return user;
};

// Create a custom hook to fetch the user data
export const useLogin = () => {
  const { addError } = useInterfaceStore((state) => state);
  const { setToken, setUser } = useUserStore((state) => state);
  const router = useRouter();
  return useMutation({
    mutationFn: (data: any) =>
      login({
        email: data.email,
        password: data.password,
      }),
    onSuccess: (user: any) => {
      //set token to local storage
      setUser(user);
    },
    onError: (error: any) => {
      console.log(error);

      if (
        error.response.data.isEmailVerified === false &&
        error.response.data.isEmailVerified !== null
      ) {
        router.push('/resend-verification');
      }
      addError({ message: error.response.data.message, type: 'error' });
      errorHandler(error);
    },
  });
};

const signUpFree = async (options: {
  registrationData: object;
  partner: string | undefined;
}) => {
  const { data } = await axios.post(
    `/auth/register?partnerid=${options.partner ? options.partner : ''}`,

    options.registrationData
  );

  return data.user;
};

export const useSignUpFree = () => {
  const { setUser } = useUserStore((state) => state);
  const { partner } = usePartnerStore((state) => state);

  return useMutation({
    mutationFn: (data: { registrationData: object }) =>
      signUpFree({
        registrationData: data.registrationData,
        partner: partner,
      }),
    onSuccess: (user) => {
      message.success('Account created successfully');
      setUser(user);
    },
    onError: (error) => {
      console.log(error);
      errorHandler(error);
    },
  });
};

const signUpPaid = async (options: {
  registrationData: object;
  features: any;
  type: 'ach' | 'card';
  partner: string | undefined;
}) => {
  const { data } = await axios.post(
    `/auth/register?partnerid=${options.partner ? options.partner : ''}`,

    { ...options.registrationData, features: options.features }
  );

  return data.user;
};

export const useSignUpPaid = () => {
  const { setUser } = useUserStore((state) => state);
  const {
    paymentMethod,
    features,
    signUpUserFormValues,
    signUpPaymentFormValues,
    signUpProfileFormValues,
  } = useInterfaceStore((state) => state);
  const { partner } = usePartnerStore((state) => state);

  return useMutation({
    mutationFn: () =>
      signUpPaid({
        registrationData: {
          ...signUpUserFormValues,
          ...{ profile: signUpProfileFormValues },
          ...signUpPaymentFormValues,
        },
        features: features,
        type: paymentMethod,
        partner: partner,
      }),
    onSuccess: (user) => {
      message.success('Account created successfully');
      setUser(user);
    },
    onError: (error) => {
      console.log(error);
      errorHandler(error);
    },
  });
};

const verifyEmail = async (options: { code: string }) => {
  //call api
  const { data } = await axios.post(`/auth/verifyEmail?verify=${options.code}`);
  //get token
  const user = data.user;
  return user;
};

export const useVerifyEmail = () => {
  const { setUser } = useUserStore((state) => state);
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { code: string }) =>
      verifyEmail({
        code: data.code,
      }),
    onSuccess: (user) => {
      setUser(user);
      message.success('Email verified successfully!');
    },
    onError: (error: any) => {
      if (error.response.data.message === 'Invalid token.') {
        message.error(
          'It looks like your verification link is invalid or has expired, please request a new one.'
        );
        router.push('/resend-verification');
      } else {
        errorHandler(error);
      }
    },
  });
};

const resendVerificationEmail = async (options: { email: string }) => {
  //call api
  const { data } = await axios.post('/auth/resend-verification-email', {
    email: options.email,
  });

  return data;
};

export const useResendVerificationEmail = () => {
  const { setDidSendEmail } = useInterfaceStore((state) => state);

  return useMutation({
    mutationFn: (data: { email: string }) =>
      resendVerificationEmail({
        email: data.email,
      }),
    onSuccess: (data) => {
      message.success(data.message);
      setDidSendEmail(true);
    },
    onError: (error) => {
      console.log(error);
      errorHandler(error);
    },
  });
};

const sendPasswordForgotRequest = async (options: { email: string }) => {
  //call api
  const { data } = await axios.post('/auth/forgotpassword', {
    email: options.email,
  });

  return data;
};

export const useSendPasswordForgotRequest = () => {
  const { setDidSendEmail } = useInterfaceStore((state) => state);

  return useMutation({
    mutationFn: (data: { email: string }) =>
      sendPasswordForgotRequest({
        email: data.email,
      }),
    onSuccess: (data) => {
      message.success(data.message);
      setDidSendEmail(true);
    },
    onError: (error) => {
      console.log(error);
      errorHandler(error);
    },
  });
};

const createNewPassword = async (options: {
  resetToken: string;
  password: string;
  confirmPassword: string;
}) => {
  //call api
  const { data } = await axios.put(
    `/auth/resetpassword/${options.resetToken}`,
    {
      password: options.password,
      confirmPassword: options.confirmPassword,
    }
  );

  return data;
};

export const useCreateNewPassword = () => {
  const { setUser } = useUserStore((state) => state);

  return useMutation({
    mutationFn: (data: {
      resetToken: string;
      password: string;
      confirmPassword: string;
    }) =>
      createNewPassword({
        resetToken: data.resetToken,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    onError: (error) => {
      console.log(error);
      errorHandler(error);
    },
    onSuccess: (data) => {
      console.log(data);
      message.success(data.message);
      setUser(data.user);
    },
  });
};
