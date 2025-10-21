'use client';
import styles from './AuthPage.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useUserStore } from '@/state/user';
import Loader from '@/components/loader/Loader.component';
import { Modal } from 'antd';
import { useInterfaceStore } from '@/state/interface';
import { usePartnerStore } from '@/state/partner';
import SideView from '@/layout/sideView/SideView.layout';
import ShoppingCart from '@/components/shoppingCart/ShoppingCart.component';
import { useRecapcha } from '@/hooks/useRecapcha';
import { useQueryParamsStore } from '@/state/queryParams';
import { getRedirectName } from '@/layout/authPage/getRedirectName';

type Props = {
  children: React.ReactNode;
};

const AuthPage = (props: Props) => {
  const router = useRouter();
  const { user, logout } = useUserStore((state) => state);
  const { setRedirectName, redirectName, setCurrentSignUpStep } =
    useInterfaceStore((state) => state);
  const { setPartner } = usePartnerStore((state) => state);
  const { loadFromUrlParams, getParam } = useQueryParamsStore((state) => state);
  const searchParams = useSearchParams();

  // Load all query parameters into the store automatically
  // This captures any query params like: ?token=abc123&partner=partner-id&redirect=/dashboard&newParam1=value
  useEffect(() => {
    loadFromUrlParams(searchParams);
  }, [searchParams]);

  // Get parameters from the store
  const redirect = getParam('redirect');
  const shouldLogout = getParam('logout') === 'true';
  const partner = getParam('partnerslug') || getParam('partner');

  useRecapcha();

  const performRedirect = (to: string) => {
    // console.log("We're redirecting to", to);
    window.location.href = to as any;

    // after redirect dispatch the logout action to keep the token from being stored indefinitely
    logout();
  };

  // Set redirect name based on redirect param
  useEffect(() => {
    if (redirect) {
      const name = getRedirectName(redirect);
      console.log(name);
      setRedirectName(name);
    } else {
      setRedirectName('');
    }
  }, [redirect, setRedirectName]);

  useEffect(() => {
    if (user) {
      if (!user.isEmailVerified) {
        setCurrentSignUpStep(5);
        router.push('/signup');
        return;
      }

      if (redirect) return performRedirect(redirect + `?token=${user.token}`);

      performRedirect(
        process.env.NEXT_PUBLIC_PORTAL_URL +
          (user ? `/home?token=${user.token}` : '')
      );
    }
  }, [user, partner, router]);

  return (
    <div className={styles.wrapper}>
      <Modal
        open={user && user.isEmailVerified}
        centered
        footer={null}
        closable={false}
        maskClosable={false}
      >
        <div className={styles.redirectModal}>
          <Loader />
          <h4>
            Taking you to <br />
            <span>{redirectName}</span>
          </h4>
        </div>
      </Modal>

      <div className={styles.container}>
        <div className={styles.sideContainer}>
          <SideView />
          <ShoppingCart />
        </div>

        <div className={styles.auth}>
          {redirectName && <div className={styles.banner}>{redirectName}</div>}
          <div className={styles.childrenContainer}>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
