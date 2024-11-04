//Use react-query to fetch data from the server
import axios from "@/utils/axios";
import errorHandler from "@/utils/errorHandler";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserStore } from "../user";
import { message } from "antd";
import { useInterfaceStore } from "../interface";
import { useRouter } from "next/navigation";
import { usePartnerStore } from "../partner";

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

      if (error.response.data.isEmailVerified === false && error.response.data.isEmailVerified !== null) {
        router.push("/resend-verification");
      }
      errorHandler(error);
    },
  });
};

const signUpFree = async (options: { registrationData: Object; partner: string | undefined }) => {
  const { data } = await axios.post(
    `/auth/register?partnerid=${options.partner ? options.partner : ""}`,

    options.registrationData
  );

  return data.user;
};

export const useSignUpFree = () => {
  const { setUser } = useUserStore((state) => state);
  const { partner } = usePartnerStore((state) => state);

  return useMutation({
    mutationFn: (data: { registrationData: Object }) =>
      signUpFree({
        registrationData: data.registrationData,
        partner: partner,
      }),
    onSuccess: (user) => {
      message.success("Account created successfully");
      setUser(user);
    },
    onError: (error) => {
      console.log(error);
      errorHandler(error);
    },
  });
};

const signUpPaid = async (options: {
  registrationData: Object;
  features: any;
  type: "ach" | "card";
  partner: string | undefined;
}) => {
  var url;
  switch (options.type) {
    case "ach":
      url = `/auth/register-ach`;
      break;
    case "card":
      url = `/auth/register-cc`;
      break;
  }

  const { data } = await axios.post(
    url + `?partnerid=${options.partner ? options.partner : ""}`,

    { user: options.registrationData, features: options.features }
  );

  return data.user;
};

export const useSignUpPaid = () => {
  const { setUser } = useUserStore((state) => state);
  const { paymentMethod, features, signUpUserFormValues, signUpPaymentFormValues, signUpProfileFormValues } =
    useInterfaceStore((state) => state);
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
      message.success("Account created successfully");
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
  const { data } = await axios.get(`/auth/verifyEmail?verify=${options.code}`);
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
      message.success("Email verified successfully!");
    },
    onError: (error: any) => {
      if (error.response.data.message === "Invalid token.") {
        message.error("It looks like your verification link is invalid or has expired, please request a new one.");
        router.push("/resend-verification");
      }
    },
  });
};

const resendVerificationEmail = async (options: { email: String }) => {
  //call api
  const { data } = await axios.post("/auth/resend-verification-email", {
    email: options.email,
  });

  return data;
};

export const useResendVerificationEmail = () => {
  const { setDidSendEmail } = useInterfaceStore((state) => state);

  return useMutation({
    mutationFn: (data: { email: String }) =>
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

const sendPasswordForgotRequest = async (options: { username: String }) => {
  //call api
  const { data } = await axios.post("/auth/forgotpassword", {
    username: options.username,
  });

  return data;
};

export const useSendPasswordForgotRequest = () => {
  const { setDidSendEmail } = useInterfaceStore((state) => state);

  return useMutation({
    mutationFn: (data: { username: String }) =>
      sendPasswordForgotRequest({
        username: data.username,
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

const createNewPassword = async (options: { resetToken: String; password: String }) => {
  //call api
  const { data } = await axios.put(`/auth/resetpassword/${options.resetToken}`, {
    password: options.password,
  });

  return data;
};

export const useCreateNewPassword = () => {
  const { setUser } = useUserStore((state) => state);

  return useMutation({
    mutationFn: (data: { resetToken: String; password: String }) =>
      createNewPassword({
        resetToken: data.resetToken,
        password: data.password,
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
