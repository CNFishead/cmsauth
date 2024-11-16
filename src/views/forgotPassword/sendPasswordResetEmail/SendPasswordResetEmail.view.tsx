'use client';
import styles from './SendPasswordResetEmail.module.scss';
import { Form, Input, Button } from 'antd';
import { useSendPasswordForgotRequest } from '@/state/serverState/auth';
import { useInterfaceStore } from '@/state/interface';
import Loader from '@/components/loader/Loader.component';
import MainWrapper from '@/layout/mainWrapper/MainWrapper.layout';
import InfoWrapper from '@/layout/infoWrapper/InfoWrapper.layout';

const SendPasswordResetEmail = () => {
  const [form] = Form.useForm();
  const { mutate: sendPasswordForgotRequest, isLoading } =
    useSendPasswordForgotRequest() as any;
  const { didSendEmail } = useInterfaceStore((state) => state);

  const onFinish = async (values: any) => {
    console.log(values);
    sendPasswordForgotRequest({
      email: values.email,
    });
  };

  return (
    <div className={styles.auth}>
      <MainWrapper
        title="Forgot your password?"
        description="Please enter your email associated with your ShepherdCMS account and we will send you a link to reset your password."
      >
        {didSendEmail ? (
          <div className={styles.resendSuccess}>
            We have sent you a link to reset your password. Please check your
            email inbox and click on the link that we have sent you. This will
            allow you to reset your password.
          </div>
        ) : !isLoading ? (
          <Form
            layout="vertical"
            className={styles.form}
            form={form}
            onFinish={() => onFinish(form.getFieldsValue())}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email',
                },
              ]}
            >
              <Input placeholder="Email" className={styles.input} />
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
