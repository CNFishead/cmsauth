import React from 'react';
import styles from './ResendVerification.module.scss';
import { Form, Input, Button } from 'antd';
import {
  useResendVerificationEmail,
  useVerifyEmail,
} from '@/state/serverState/auth';
import { useInterfaceStore } from '@/state/interface';
import Loader from '@/components/loader/Loader.component';
import InfoWrapper from '@/layout/infoWrapper/InfoWrapper.layout';
import MainWrapper from '@/layout/mainWrapper/MainWrapper.layout';
import { useRouter } from 'next/router';
import usePostData from '@/state/usePostData';
import Image from 'next/image';
type Props = {};

const ResendVerification = (props: Props) => {
  const router = useRouter();
  // pull out the verify token from the query params
  const verifyCode = router.query.verify as string;
  const [merchant, setMerchant] = React.useState<any>({});
  const { mutate: resendVerification, isLoading } =
    useResendVerificationEmail();
  const { didSendEmail } = useInterfaceStore((state) => state);
  const {
    mutate: verifyEmail,
    data: verifyData,
    isLoading: verifyLoading,
    isSuccess: isVerifySuccess,
  } = usePostData({
    url: `/auth/verifyEmail?verify=${verifyCode}`,
    key: 'verifyEmail',
    onSuccessCallback: (data) => {
      setMerchant(data.payload);
    },
  });

  const onFinish = async (values: any) => {
    resendVerification({
      email: values.email,
    });
  };
  React.useEffect(() => {
    if (verifyCode) {
      verifyEmail({ code: verifyCode });
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
          description="Someone from our team will reach out to you shortly to help you get started. In the meantime, feel free to explore our website and learn more about our services."
        >
          <div className={styles.successVerify}>
            <h3 className={styles.successTitle}>
              Welcome to Pyre{' '}
              <span className={styles.businessName}>
                {merchant.businessInfo.name}
              </span>
            </h3>
            {/* image logo container for the merchant if they uploaded a logo */}
            <div className={styles.logoContainer}>
              <Image
                src={merchant.businessInfo.logoUrl}
                alt="Merchant logo"
                className={styles.logo}
                width={400}
                height={200}
              />
            </div>
            <div className={styles.descriptionContainer}>
              <p className={styles.description}>
                Someone from our team will reach out to you shortly to help you
                get started. In the meantime, feel free to explore our website
                and learn more about our services.
              </p>
              <p>
                Meanwhile feel free to see your merchant services page!{' '}
                <a
                  href={`https://payment.pyreprocessing.com/service/nmi/${merchant.businessInfo.businessSlug}`}
                  className={styles.merchantLink}
                >
                  {merchant.businessInfo.name}'s services page
                </a>{' '}
                this page is specific to your account! while it doesnt have any
                services yet, you can see the page and how it will look like
                when you have services.
              </p>
              <Button
                type="primary"
                href={`https://payment.pyreprocessing.com/service/nmi/${merchant.businessInfo.businessSlug}`}
              >
                Go to your services page
              </Button>
            </div>
          </div>{' '}
        </MainWrapper>
        <InfoWrapper links={['login']} />
      </div>
    );
  }
  return (
    <div className={styles.auth}>
      <MainWrapper
        title="Let's get you verified"
        description="Please enter your email and we'll send you a link to verify your
          Pyre account."
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
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email' }]}
            >
              <Input placeholder="Username" className={styles.input} />
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
