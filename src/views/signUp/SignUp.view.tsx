"use client";
import styles from "./SignUp.module.scss";
import { Button, Empty, Modal } from "antd";
import { BsBox } from "react-icons/bs";
import { useInterfaceStore } from "@/state/interface";
import UserInformationForm from "./steps/userInformation/UserInformationForm.component";
import { AiOutlineCheckCircle, AiOutlineUser } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import ProfileInformationForm from "./steps/profileInformation/ProfileInformationForm.component";
import Loader from "@/components/loader/Loader.component";
import VerifySteps from "./steps/verifySteps/VerifySteps.component";
import VerifyEmail from "./steps/verifyEmail/VerifyEmail.component";
import MainWrapper from "@/layout/mainWrapper/MainWrapper.layout";
import InfoWrapper from "@/layout/infoWrapper/InfoWrapper.layout";
import { validateForm } from "@/utils/validateForm";
import { encryptData } from "@/utils/encryptData";
import { usePartnerStore } from "@/state/partner";
import React, { useEffect, useState } from "react";
import useApiHook from "@/state/useApi";
import BusinessLogoUpload from "./steps/businessLogoUpload/BusinessLogoUpload.form";
import { CgProfile } from "react-icons/cg";
import FeatureChoose from "./steps/featureChoose/FeatureChoose.component";
import PaymentInformation from "./steps/paymentInformation/PaymentInformation.component";

type Props = {};

const SignUpView = (props: Props) => {
  const {
    currentSignUpStep,
    goBackToPreviousSignUpStep,
    isGoingToPreviousStep,
    advanceToNextSignUpStep,
    currentForm,
    signUpUserFormValues,
    setSignUpUserFormValues,
    addError,
    setSteps,
    steps,
    features,
  } = useInterfaceStore((state) => state);
  const [registerMerchantLoading, setRegisterMerchantLoading] = useState(false);
  const { mutate: registerMerchant } = useApiHook({
    url: "/auth/register",
    key: "registerMerchant",
    method: "POST",
  }) as any;
  const { partner: partnerSlug, setBranding } = usePartnerStore((state) => state);

  const { data: merchantData } = useApiHook({
    url: `/partner/${partnerSlug}`,
    key: ["merchantData", partnerSlug!],
    method: "GET",
  }) as any;

  React.useEffect(() => {
    setSteps({
      0: {
        id: 0,
        title: "User Info",
        component: <UserInformationForm />,
        nextButtonText: "Next",
        headerText: "We're excited to have you!",
        subHeaderText:
          "Please fill out the form below to get started. This information is all about you, the account user!",
        nextButtonDisabled: false,
        hideBackButton: true,
        icon: <AiOutlineUser />,
        nextButtonAction: async () => {
          if (await validateForm(currentForm)) {
            setSignUpUserFormValues({
              ...signUpUserFormValues,
              userInfo: currentForm.getFieldsValue(),
            });
            advanceToNextSignUpStep();
          } else {
            addError({ message: "Please complete the form before continuing", type: "error" });
          }
        },
      },
      1: {
        id: 1,
        title: "Ministry Info",
        component: <ProfileInformationForm />,
        nextButtonText: "Next",
        headerText: "Ministry Information",
        subHeaderText: "This is the main ministry, you'll be able to create sub-ministries later on.",
        icon: <BsBox />,
        nextButtonDisabled: false,
        hideBackButton: false,
        nextButtonAction: async () => {
          if (await validateForm(currentForm)) {
            setSignUpUserFormValues({
              ...signUpUserFormValues,
              ministryInfo: currentForm.getFieldsValue(),
            });
            advanceToNextSignUpStep();
          } else {
            addError({ message: "Please complete the form before continuing", type: "error" });
          }
        },
      },
      2: {
        id: 1,
        title: "Ministry banner",
        component: <BusinessLogoUpload />,
        nextButtonText: "Next",
        headerText: "Ministry Banner",
        isHiddenOnSteps: true,
        subHeaderText:
          "Upload a banner for your ministry. This will be displayed to your congregation when checking in.",
        icon: <CgProfile />,
        nextButtonDisabled: false,
        hideBackButton: false,
        nextButtonAction: () => {
          Modal.confirm({
            title: "Public View Notice",
            content: <p>This information will be visible to the public, are you sure you want to continue?</p>,
            onOk() {
              setSignUpUserFormValues({
                ...signUpUserFormValues,
                ministryInfo: {
                  ...signUpUserFormValues.ministryInfo,
                  ...currentForm.getFieldsValue(),
                },
              });
              advanceToNextSignUpStep();
            },
          });
        },
      },
      3: {
        id: 1,
        title: "Features",
        component: <FeatureChoose />,
        nextButtonText: "Next",
        headerText: "Features",
        subHeaderText: "Choose what matters to your church! You can always change this later.",
        icon: <CgProfile />,
        nextButtonDisabled: false,
        hideBackButton: false,
        nextButtonAction: () => {
          if (features.length > 0) {
            advanceToNextSignUpStep();
          } else {
            addError({ message: "Please select at least one feature", type: "error" });
          }
        },
      },
      4: {
        id: 1,
        title: "Payment information",
        component: <PaymentInformation />,
        nextButtonText: "Next",
        headerText: "Credit Card Information",
        subHeaderText: "At the current time, we only accept credit card payments. Please fill out the form below.",
        icon: <CgProfile />,
        nextButtonDisabled: false,
        hideBackButton: false,
        nextButtonAction: () => {
          Modal.confirm({
            title: "14-day Free Trial Information",
            content: (
              <div className={"free-trial-modal"}>
                <p>
                  <strong>Nominal Authorization Charge:</strong> To ensure a smooth trial initiation, we will authenticate the card details
                  you provide, this may result in a nominal charge of $1.00. This charge will be voided and refunded
                </p>
                <br />
                <p>
                  <strong>Automatic Free Trial Activation:</strong> Once you've verified your email address and we have
                  verified your account, you'll gain full access to your selected features for <strong>free</strong> for
                  the first 14 days since creating your account.
                </p>
                <br />
                <p>
                  <strong>Cancel anytime:</strong> You can cancel at any time during this period and you will not be
                  charged. If you do not cancel, your payment method will be automatically charged at the end of the
                  trial period.
                </p>
              </div>
            ),
            okText: "Agree and Register",
            onOk: () => {
              // if (recapchaIsVerified) signUpPaid();
              // else message.error("We couldn't verify that you are a human. Please try again.");
            },
          });
        },
      },
      5: {
        id: 1,
        isHiddenOnSteps: true,
        component: <VerifySteps />,
        nextButtonText: "Send Verification Email",
        headerText: "Next Steps",
        subHeaderText: "There are a few verifications steps needed before you can start using your account.",
        nextButtonDisabled: false,
        hideBackButton: false,
        nextButtonAction: () => {
          setRegisterMerchantLoading(true);
          registerMerchant(
            {
              data: encryptData(JSON.stringify({ ...signUpUserFormValues, agentCode: partnerSlug })),
            },
            {
              onSuccess: () => {
                advanceToNextSignUpStep();
                setRegisterMerchantLoading(false);
              },
            }
          );
        },
      },
      6: {
        id: 1,
        title: "Verification",
        isHiddenOnSteps: false,
        component: <VerifyEmail />,
        headerText: "Verification Email Sent",
        subHeaderText: "Please check your email to verify your account to start your free 14-day trial.",
        icon: <AiOutlineCheckCircle />,
        hideBackButton: true,
        hideNextButton: true,
      },
    });
  }, [currentSignUpStep, currentForm, features]);

  useEffect(() => {
    // set the partner in the partner store
    if (merchantData?.payload) {
      setBranding({
        logo: merchantData?.payload?.businessInfo?.logoUrl,
        name: merchantData?.payload?.businessInfo?.name,
        primaryColor: "#000",
        secondaryColor: "#000",
      });
    }
  }, [merchantData?.payload]);

  if (registerMerchantLoading)
    return (
      <div className={styles.wrapper}>
        <div className={styles.auth}>
          <MainWrapper
            title={"Creating Account"}
            description={"Please wait while we create your account. This may take a few moments..."}
          >
            <Loader />
          </MainWrapper>
        </div>
      </div>
    );

  if (!merchantData?.payload && partnerSlug) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.auth}>
          <MainWrapper
            title={"Error Finding Merchant Data"}
            description={
              "We could not find the merchant data for this partner. Please contact support, or check that the link to the partner is correct."
            }
          >
            <Empty
              // use a warning icon
              image={Empty.PRESENTED_IMAGE_DEFAULT}
              description={""}
            />
          </MainWrapper>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <AnimatePresence initial={true} mode="wait">
        <motion.div
          className={styles.auth}
          initial={{
            x: isGoingToPreviousStep ? -80 : 80,
            opacity: 0,
            scale: 0.99,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.3,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
          }}
          key={currentSignUpStep}
        >
          <MainWrapper
            title={steps[currentSignUpStep]?.headerText}
            description={steps[currentSignUpStep]?.subHeaderText}
          >
            {steps[currentSignUpStep]?.component}
          </MainWrapper>

          <InfoWrapper links={["login"]}>
            <div className={styles.buttons}>
              {!steps[currentSignUpStep]?.hideBackButton && (
                <Button
                  type="text"
                  className={styles.backButton}
                  onClick={steps[currentSignUpStep]?.previousButtonAction || goBackToPreviousSignUpStep}
                >
                  Back
                </Button>
              )}
              {!steps[currentSignUpStep]?.hideNextButton && (
                <Button
                  type="primary"
                  onClick={() => {
                    steps[currentSignUpStep]?.nextButtonAction!();
                  }}
                  disabled={steps[currentSignUpStep]?.nextButtonDisabled}
                  className={styles.nextButton}
                >
                  {steps[currentSignUpStep]?.nextButtonText || "Next"}
                </Button>
              )}
            </div>
          </InfoWrapper>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SignUpView;
