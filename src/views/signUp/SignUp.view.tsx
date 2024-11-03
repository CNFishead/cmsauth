"use client";
import styles from "./SignUp.module.scss";
import { Button, Empty, Modal, Steps, message } from "antd";
import { BsBox } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePayments } from "react-icons/md";
import { useInterfaceStore } from "@/state/interface";
import { SignUpStep } from "@/types/signUpSteps";
import UserInformationForm from "./steps/userInformation/UserInformationForm.component";
import { AiOutlineCheckCircle, AiOutlineUser } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import PaymentInformation from "./steps/paymentInformation/PaymentInformation.component";
import ProfileInformationForm from "./steps/profileInformation/ProfileInformationForm.component";
import { useSignUpFree, useSignUpPaid } from "@/state/serverState/auth";
import Loader from "@/components/loader/Loader.component";
import VerifySteps from "./steps/verifySteps/VerifySteps.component";
import VerifyEmail from "./steps/verifyEmail/VerifyEmail.component";
import { useUserStore } from "@/state/user";
import MainWrapper from "@/layout/mainWrapper/MainWrapper.layout";
import InfoWrapper from "@/layout/infoWrapper/InfoWrapper.layout";
import { validateForm } from "@/utils/validateForm";
import BuisnessInformation from "./steps/businessInformation/BuisnessInformation.form";
import BusinessLogoUpload from "./steps/businessLogoUpload/BusinessLogoUpload.form";
import usePostData from "@/state/usePostData";
import { encryptData } from "@/utils/encryptData";
import { usePartnerStore } from "@/state/partner";
import useFetchData from "@/state/useFetchData";
import { useEffect } from "react";
import UserType from "@/types/UserType";
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
  } = useInterfaceStore((state) => state);
  // const { mutate: registerMerchant } = usePostData({
  //   url: "/auth/register",
  //   key: "registerMerchant",
  // });
  const { partner: agentSlug, setBranding } = usePartnerStore((state) => state);

  const { user } = useUserStore((state) => state);

  // const { data: merchantData, isLoading: merchantDataLoading } = useFetchData({
  //   url: `/merchant/services/${agentSlug}`,
  //   key: ["merchantData", agentSlug!],
  //   refetchOnWindowFocus: true,
  // });

  const signUpSteps: {
    [key: number]: SignUpStep;
  } = {
    0: {
      id: 0,
      title: "User Info",
      component: <UserInformationForm />,
      nextButtonText: "Next",
      headerText: "We're excited to have you!",
      subHeaderText:
        "You're just a few steps away from starting your journey with Pyre! Let's start by getting some information about you.",
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
        } else message.error("Please complete the form before continuing");
      },
    },
    1: {
      id: 1,
      title: "Ministry Info",
      component: <ProfileInformationForm />,
      nextButtonText: "Next",
      headerText: "Business Information",
      subHeaderText: "Let us know about your business!",
      icon: <BsBox />,
      nextButtonDisabled: false,
      hideBackButton: false,
      nextButtonAction: async () => {
        if (await validateForm(currentForm)) {
          setSignUpUserFormValues({
            ...signUpUserFormValues,
            businessInfo: currentForm.getFieldsValue(),
          });
          advanceToNextSignUpStep();
        } else message.error("Please complete the form before continuing");
      },
    }, 
    3: {
      id: 1,
      isHiddenOnSteps: true,
      component: <VerifySteps />,
      nextButtonText: "Send Verification Email",
      headerText: "Next Steps",
      subHeaderText: "There are a few verifications steps needed before you can start using your account.",
      nextButtonDisabled: false,
      hideBackButton: false,
      nextButtonAction: () => {
        // registerMerchant(
        //   {
        //     data: encryptData(JSON.stringify({ ...signUpUserFormValues, agentCode: agentSlug })),
        //   },
        //   { onSuccess: () => advanceToNextSignUpStep() }
        // );
      },
    },
    4: {
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
  };

  useEffect(
    () => {
      // set the partner in the partner store
      // if (merchantData?.payload) {
      // setBranding({
      // logo: merchantData?.payload?.businessInfo?.logoUrl,
      // name: merchantData?.payload?.businessInfo?.name,
      //   primaryColor: "#000",
      //   secondaryColor: "#000",
      // });
      // }
    },
    [
      // merchantData?.payload
    ]
  );

  // if (registerMerchantLoading)
  //   return (
  //     <div className={styles.wrapper}>
  //       <div className={styles.auth}>
  //         <MainWrapper
  //           title={"Creating Account"}
  //           description={"Please wait while we create your account. This may take a few moments..."}
  //         >
  //           <Loader />
  //         </MainWrapper>
  //       </div>
  //     </div>
  //   );

  // if (!merchantData?.payload && agentSlug) {
  //   return (
  //     <div className={styles.wrapper}>
  //       <div className={styles.auth}>
  //         <MainWrapper
  //           title={"Error Finding Merchant Data"}
  //           description={
  //             "We could not find the merchant data for this partner. Please contact support, or check that the link to the partner is correct."
  //           }
  //         >
  //           <Empty
  //             // use a warning icon
  //             image={Empty.PRESENTED_IMAGE_DEFAULT}
  //             description={""}
  //           />
  //         </MainWrapper>
  //       </div>
  //     </div>
  //   );
  // }
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
            title={signUpSteps[currentSignUpStep]?.headerText}
            description={signUpSteps[currentSignUpStep]?.subHeaderText}
          >
            {signUpSteps[currentSignUpStep]?.component}
          </MainWrapper>

          <InfoWrapper links={["login"]}>
            <div className={styles.buttons}>
              {!signUpSteps[currentSignUpStep]?.hideBackButton && (
                <Button
                  type="text"
                  className={styles.backButton}
                  onClick={signUpSteps[currentSignUpStep]?.previousButtonAction || goBackToPreviousSignUpStep}
                >
                  Back
                </Button>
              )}
              {!signUpSteps[currentSignUpStep]?.hideNextButton && (
                <Button
                  type="primary"
                  onClick={() => {
                    signUpSteps[currentSignUpStep]?.nextButtonAction!();
                  }}
                  disabled={signUpSteps[currentSignUpStep]?.nextButtonDisabled}
                  className={styles.nextButton}
                >
                  {signUpSteps[currentSignUpStep]?.nextButtonText || "Next"}
                </Button>
              )}
            </div>
          </InfoWrapper>
        </motion.div>
      </AnimatePresence>
      <div className={styles.stepsContainer}>
        <Steps
          className={styles.steps}
          current={currentSignUpStep}
          items={
            Object.values(signUpSteps)
              .filter((s) => !s.isHiddenOnSteps)
              .map((step) => {
                return {
                  title: (
                    <div className={styles.step}>
                      {/* {step.icon} */}
                      <span>{step.title || ""}</span>
                    </div>
                  ),
                  // icon: step.icon,
                  // status: step.id === currentSignUpStep ? 'process' : '',
                };
              }) as any
          }
          size="small"
        />
      </div>
    </div>
  );
};

export default SignUpView;
