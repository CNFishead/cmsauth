'use client';
import styles from './SignIn.module.scss';
import { Form, Input, Button, message, Card } from 'antd';
import { useLogin } from '@/state/serverState/auth';
import { useInterfaceStore } from '@/state/interface';
import InfoWrapper from '@/layout/infoWrapper/InfoWrapper.layout';
import MainWrapper from '@/layout/mainWrapper/MainWrapper.layout';
import { useRouter, useSearchParams } from 'next/navigation';

const SignInView = () => {
  const router = useRouter();
  // check for the redirect query param
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const { mutate: login } = useLogin();
  const { redirectName, recapchaIsVerified, setRedirectName, setRedirectUrl } =
    useInterfaceStore((state) => state);

  const onFinish = async (values: any) => {
    const logout = searchParams.get('logout') === 'true';
    if (recapchaIsVerified) {
      // login({
      //   email: values.email,
      //   password: values.password,
      // });
    } else
      message.error(
        "We couldn't verify that you are a human. Please try again."
      );
  };

  return (
    <div className={styles.auth}>
      <MainWrapper
        title="Welcome Back"
        description={
          'Please login to your account to access your ' + redirectName + '.'
        }
      >
        {!redirectName ? (
          <div className={styles.signinCardsContainer}>
            <Card
              className={styles.card}
              onClick={() =>
                setRedirectUrl(
                  process.env.NODE_ENV === 'production'
                    ? 'https://merchant.pyreprocessing.com'
                    : 'http://localhost:3000'
                )
              }
            >
              Merchant Sign-In
            </Card>
            <Card
              className={styles.card}
              onClick={() =>
                setRedirectUrl(
                  process.env.NODE_ENV === 'production'
                    ? 'https://portal.pyreprocessing.com'
                    : 'http://localhost:3000'
                )
              }
            >
              Partner Sign-In
            </Card>
          </div>
        ) : (
          <Form layout="vertical" className={styles.form} onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email' }]}
            >
              <Input placeholder="Email" className={styles.input} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password' },
              ]}
            >
              <Input
                placeholder="Password"
                className={styles.input}
                type="password"
              />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form>
        )}
      </MainWrapper>

      <InfoWrapper links={['forgot-password', 'signup']} />
    </div>
  );
};

export default SignInView;
