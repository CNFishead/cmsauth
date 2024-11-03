import styles from './SendPasswordResetEmail.module.scss';
import Image from 'next/image';
import { Form, Input, Button } from 'antd';
import {
  useLogin,
  useResendVerificationEmail,
  useSendPasswordForgotRequest,
} from '@/state/serverState/auth';
import { useUserStore } from '@/state/user';
import { useInterfaceStore } from '@/state/interface';
import { useState } from 'react';
import Loader from '@/components/loader/Loader.component';
import MainWrapper from '@/layout/mainWrapper/MainWrapper.layout';
import InfoWrapper from '@/layout/infoWrapper/InfoWrapper.layout';
type Props = {};

const SendPasswordResetEmail = (props: Props) => {
  const { mutate: sendPasswordForgotRequest, isLoading } =
    useSendPasswordForgotRequest();
  const { didSendEmail } = useInterfaceStore((state) => state);

  const onFinish = async (values: any) => {
    sendPasswordForgotRequest({
      username: values.username,
    });
  };

  return (
    <div className={styles.auth}>
      <MainWrapper
        title="Forgot your password?"
        description="Please enter your email associated with your Pyreprocessing account and we will send you a link to reset your password."
      >
        {didSendEmail ? (
          <div className={styles.resendSuccess}>
            We have sent you a link to reset your password. Please check your
            email inbox and click on the link that we have sent you. This will
            allow you to reset your password.
          </div>
        ) : !isLoading ? (
          <Form layout="vertical" className={styles.form} onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your email',
                },
              ]}
            >
              <Input placeholder="Email or Username" className={styles.input} />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Send Password Reset Email
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

export default SendPasswordResetEmail;
