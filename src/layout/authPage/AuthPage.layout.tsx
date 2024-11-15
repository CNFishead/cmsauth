"use client";
import styles from "./AuthPage.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/state/user";
import Loader from "@/components/loader/Loader.component";
import { Modal } from "antd";
import { useInterfaceStore } from "@/state/interface";
import { usePartnerStore } from "@/state/partner";
import SideView from "@/layout/sideView/SideView.layout";
import ShoppingCart from "@/components/shoppingCart/ShoppingCart.component";
import { useRecapcha } from "@/utils/useRecapcha";

type Props = {
  children: React.ReactNode;
};

const AuthPage = (props: Props) => {
  const router = useRouter();
  const { user, logout } = useUserStore((state) => state);
  const { setRedirectName, redirectName, setCurrentSignUpStep, setRedirectUrl, redirectUrl } = useInterfaceStore(
    (state) => state
  );
  const { setPartner } = usePartnerStore((state) => state);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") as string;
  const shouldLogout = searchParams.get("logout") === "true";
  const partner = searchParams.get("partnerslug") as string;

  useRecapcha();

  const performRedirect = (to: string) => {
    // console.log("We're redirecting to", to);
    window.location.href = to as any;

    // after redirect dispatch the logout action to keep the token from being stored indefinitely
    logout();
  };

  useEffect(() => {
    if (shouldLogout) logout();

    try {
      if (redirect) {
        setRedirectUrl(redirect);
        setRedirectName(
          redirect?.split(/[/.]/)[2][0].toUpperCase() + redirect?.split(/[/.]/)[2].slice(1).toLowerCase()
        );
      }
      if (redirectUrl) {
        setRedirectName(
          redirectUrl?.split(/[/.]/)[2][0].toUpperCase() + redirectUrl?.split(/[/.]/)[2].slice(1).toLowerCase()
        );
      }
    } catch {
      setRedirectName("");
    }
  }, [router, redirect, redirectUrl]);

  useEffect(() => {
    // if (!router.isReady) return;

    if (partner) {
      setPartner(partner);
    }

    if (user) {
      if (!user.isEmailVerified) {
        setCurrentSignUpStep(5);
        router.push("/signup");
        return;
      }

      if (redirect) return performRedirect(redirect + `?token=${user.token}`);

      performRedirect(
        process.env.ENV === "development"
          ? `http://localhost:3000/home${user ? `?token=${user.token}` : ""}`
          : `https://portal.shepherdcms.org/home${user ? `?token=${user.token}` : ""}`
      );
    }
  }, [user, redirect, partner]);

  return (
    <div className={styles.wrapper}>
      <Modal open={user && user.isEmailVerified} centered footer={null} closable={false} maskClosable={false}>
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
          <div className={styles.banner}>{redirectName}</div>
          <div className={styles.childrenContainer}>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
