import styles from './ResetPassword.module.scss';
import Image from 'next/image';
import { Form, Input, Button } from 'antd';
import {
  useCreateNewPassword,
  useLogin,
  useResendVerificationEmail,
  useSendPasswordForgotRequest,
} from '@/state/serverState/auth';
import { useUserStore } from '@/state/user';
import { useInterfaceStore } from '@/state/interface';
import { useState } from 'react';
import Loader from '@/components/loader/Loader.component';
import InfoWrapper from '@/layout/infoWrapper/InfoWrapper.layout';
import MainWrapper from '@/layout/mainWrapper/MainWrapper.layout';

type Props = {
  resetToken: string;
};

const ResetPassword = (props: Props) => {
  const { mutate: createNewPassword, isLoading } = useCreateNewPassword() as any;

  const onFinish = async (values: any) => {
    createNewPassword({
      resetToken: props.resetToken,
      password: values.confirmNewPassword,
    });
  };

  return (
    <div className={styles.auth}>
      <MainWrapper
        title="Create a new password"
        description="Please enter your new password and confirm it to reset your password."
      >
        {!isLoading ? (
          <Form layout="vertical" className={styles.form} onFinish={onFinish}>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: 'Please enter your new password' },
              ]}
            >
              <Input
                placeholder="New Password"
                className={styles.input}
                type="password"
              />
            </Form.Item>
            <Form.Item
              label="Confirm New Password"
              name="confirmNewPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm your new password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords do not match');
                  },
                }),
              ]}
            >
              <Input
                placeholder="Confirm New Password"
                className={styles.input}
                type="password"
              />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        ) : (
          <div className={styles.resendSuccess}>
            <Loader title="Creating new password and logging you in." />
          </div>
        )}
      </MainWrapper>
      <InfoWrapper links={['login', 'signup']} />
    </div>
  );
};

export default ResetPassword;
