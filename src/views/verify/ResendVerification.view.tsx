'use client';
import React from 'react';
import styles from './ResendVerification.module.scss';
import { Form, Input, Button } from 'antd';
import { useResendVerificationEmail } from '@/state/serverState/auth';
import { useInterfaceStore } from '@/state/interface';
import Loader from '@/components/loader/Loader.component';
import InfoWrapper from '@/layout/infoWrapper/InfoWrapper.layout';
import MainWrapper from '@/layout/mainWrapper/MainWrapper.layout';
import { useSearchParams } from 'next/navigation';
import useApiHook from '@/state/useApi';
import decryptData from '@/utils/decryptData';
import { useUserStore } from '@/state/user';
import { data } from 'framer-motion/client';

const ResendVerification = () => {
  const verifyCode = useSearchParams().get('verify');
  const [isVerifySuccess, setIsVerifySuccess] = React.useState(false);
  // pull out the verify token from the query params
  // const verifyCode = router.query.verify as string;
  // const { mutate: resendVerification, isLoading } =
  //   useResendVerificationEmail() as any;
  const { mutate: resendVerification, isLoading } = useApiHook({
    url: '/auth/resend-verification-email',
    key: 'resendVerification',
    method: 'POST',
    onSuccessCallback: (data) => {
      setDidSendEmail(true);
      addError({
        message: 'Verification email sent successfully',
        type: 'success',
      });
    },
  }) as any;

  const { didSendEmail, addError, setDidSendEmail } = useInterfaceStore(
    (state) => state
  );
  const { setUser } = useUserStore((state) => state);
  const { mutate: verifyEmail, isLoading: verifyLoading } = useApiHook({
    url: `/auth/verifyEmail?verify=${verifyCode}`,
    key: 'verifyEmail',
    enabled: !!verifyCode,
    onSuccessCallback: (data) => {
      setIsVerifySuccess(true);
      // decrypt the data, and set the token
      const results = decryptData(data.payload) as any;
      setUser(results);
    },
    method: 'POST',
  }) as any;

  const onFinish = async (values: any) => {
    resendVerification({
      formData: { email: values.email },
    });
  };
  React.useEffect(() => {
    if (verifyCode) {
      verifyEmail({ formData: { token: verifyCode } });
    }
  }, [verifyCode]);

  if (verifyLoading) {
    return <Loader title="Verifying your email" />;
  }
  if (isVerifySuccess) {
    return (
      <div className={styles.auth}>
        <MainWrapper
          title="Congratulations! You're all set."
          description="You may login and start managing your account! If you have any questions, please feel free to reach out to us."
        ></MainWrapper>
        <InfoWrapper links={['login']} />
      </div>
    );
  }
  return (
    <div className={styles.auth}>
      <MainWrapper
        title="Let's get you verified"
        description="Please enter your email and we'll send you a link to verify your
          Shepherds account."
      >
        {didSendEmail ? (
          <div className={styles.resendSuccess}>
            We have sent you a verification email. Please check your email inbox
            and click on the link that we have sent you. This will complete the
            verification process and allow you to access your account.
          </div>
        ) : !isLoading ? (
          <Form layout="vertical" className={styles.form} onFinish={onFinish}>
            <Form.Item
              label="Email or Username"
              name="email"
              rules={[{ required: true, message: 'Please input your email' }]}
            >
              <Input placeholder="" className={styles.input} />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Send Verification Email
            </Button>
          </Form>
        ) : (
          <div className={styles.resendSuccess}>
            <Loader title="Sending email" />
          </div>
        )}
      </MainWrapper>

      <InfoWrapper links={['login', 'signup']} />
    </div>
  );
};

export default ResendVerification;
