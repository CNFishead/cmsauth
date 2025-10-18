'use client';
import styles from './SignUp.module.scss';
import { Button, Empty } from 'antd';
import { useInterfaceStore } from '@/state/interface';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from '@/components/loader/Loader.component';
import MainWrapper from '@/layout/mainWrapper/MainWrapper.layout';
import InfoWrapper from '@/layout/infoWrapper/InfoWrapper.layout';
import { validateForm } from '@/utils/validateForm';
import { usePartnerStore } from '@/state/partner';
import { useQueryParamsStore } from '@/state/queryParams';
import { SignUpStepBuilder, StepBuilderConfig } from './SignUpStepBuilder';
import React, { useEffect, useState, useMemo } from 'react';
import { useSignUpPaid } from '@/state/serverState/auth';

const SignUpView = () => {
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
    recapchaIsVerified,
    setSignUpPaymentFormValues,
    paymentMethod,
  } = useInterfaceStore((state) => state);
  const [registerMerchantLoading, setRegisterMerchantLoading] = useState(false);
  // const { mutate: registerMerchant } = useApiHook({
  //   url: '/auth/register',
  //   key: 'registerMerchant',
  //   method: 'POST',
  // }) as any;
  const { partner: partnerSlug, setBranding } = usePartnerStore(
    (state) => state
  );
  const { getParam } = useQueryParamsStore((state) => state);

  const { mutate: signUpPaid } = useSignUpPaid({});

  // Check if this is an invite signup (token present)
  // When a token is present in URL params (?token=abc123), it means this is an invite signup
  // and the user should skip ministry setup since they're joining an existing ministry
  const isInviteSignup = Boolean(getParam('token'));

  // Debug logging
  React.useEffect(() => {
    console.log('SignUp Flow Mode:', isInviteSignup ? 'INVITE' : 'REGULAR');
    console.log('Token present:', getParam('token'));
  }, [isInviteSignup, getParam]);
  // const { data: merchantData } = useApiHook({
  //   url: `/partner/${partnerSlug}`,
  //   key: ['merchantData', partnerSlug!],
  //   method: 'GET',
  // }) as any;

  // Create the step builder configuration
  const stepBuilderConfig: StepBuilderConfig = useMemo(
    () => ({
      validateForm,
      addError,
      setSignUpUserFormValues,
      setSignUpPaymentFormValues,
      signUpUserFormValues,
      currentForm,
      recapchaIsVerified,
      setRegisterMerchantLoading,
      signUpPaid,
      paymentMethod,
      advanceToNextSignUpStep,
      styles,
    }),
    [
      validateForm,
      addError,
      setSignUpUserFormValues,
      setSignUpPaymentFormValues,
      signUpUserFormValues,
      currentForm,
      recapchaIsVerified,
      setRegisterMerchantLoading,
      signUpPaid,
      paymentMethod,
      advanceToNextSignUpStep,
      styles,
    ]
  );

  // Create and use the step builder
  const stepBuilder = useMemo(
    () => new SignUpStepBuilder(stepBuilderConfig),
    [stepBuilderConfig]
  );

  React.useEffect(() => {
    console.log('Setting up steps with builder. Invite mode:', isInviteSignup);
    const stepsConfig = stepBuilder.getStepsConfig(isInviteSignup);
    setSteps(stepsConfig);
  }, [isInviteSignup, stepBuilder, setSteps]);

  // useEffect(() => {
  //   // set the partner in the partner store
  //   if (merchantData?.payload) {
  //     setBranding({
  //       logo: merchantData?.payload?.businessInfo?.logoUrl,
  //       name: merchantData?.payload?.businessInfo?.name,
  //       primaryColor: '#000',
  //       secondaryColor: '#000',
  //     });
  //   }
  // }, [merchantData?.payload]);

  if (registerMerchantLoading)
    return (
      <div className={styles.wrapper}>
        <div className={styles.auth}>
          <MainWrapper
            title={'Creating Account'}
            description={
              'Please wait while we create your account. This may take a few moments...'
            }
          >
            <Loader />
          </MainWrapper>
        </div>
      </div>
    );

  // if (!merchantData?.payload && partnerSlug) {
  //   return (
  //     <div className={styles.wrapper}>
  //       <div className={styles.auth}>
  //         <MainWrapper
  //           title={'Error Finding Merchant Data'}
  //           description={
  //             'We could not find the merchant data for this partner. Please contact support, or check that the link to the partner is correct.'
  //           }
  //         >
  //           <Empty
  //             // use a warning icon
  //             image={Empty.PRESENTED_IMAGE_DEFAULT}
  //             description={''}
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
            ease: 'easeInOut',
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

          <InfoWrapper links={['login']}>
            <div className={styles.buttons}>
              {!steps[currentSignUpStep]?.hideBackButton && (
                <Button
                  type="text"
                  className={styles.backButton}
                  onClick={
                    steps[currentSignUpStep]?.previousButtonAction ||
                    goBackToPreviousSignUpStep
                  }
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
                  {steps[currentSignUpStep]?.nextButtonText || 'Next'}
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
