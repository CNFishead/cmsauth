import React, { useState } from 'react';
import styles from './VerifyEmail.module.scss';
import { FaEnvelope } from 'react-icons/fa';
import axios from '../../../../utils/axios';
import { Button } from 'antd';
import { useResendVerificationEmail } from '@/state/serverState/auth';
import { useInterfaceStore } from '@/state/interface';
import { useUserStore } from '@/state/user';

const VerifyEmail = () => {
  const { mutate: resendEmail } = useResendVerificationEmail();
  const { user } = useUserStore((state) => state);

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <FaEnvelope className={styles.icon} />
        <p>
          We have sent a verification email to your email address. To verify
          your account, please check your email inbox and click on the link that
          we have sent you. This will complete the verification process and
          allow you to access your account.
        </p>
      </div>
      <p className={styles.subText}>
        If you do not see the email in your inbox, please check your spam
        folder. If you still do not see the email use the button below to resend
        the verification email.
      </p>
      <Button
        className={styles.button}
        onClick={() => {
          resendEmail({ email: user.email });
        }}
      >
        Resend Verification Email
      </Button>
    </div>
  );
};

export default VerifyEmail;
