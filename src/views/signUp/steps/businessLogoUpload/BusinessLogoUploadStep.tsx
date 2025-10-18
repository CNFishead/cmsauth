import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { Modal } from 'antd';
import { SignUpStep } from '@/types/signUpSteps';
import { StepBuilderConfig } from '../../SignUpStepBuilder';
import BusinessLogoUpload from './BusinessLogoUpload.form';

/**
 * Handle ministry banner submission with confirmation modal
 */
const handleMinistryBannerSubmit = (config: StepBuilderConfig): void => {
  Modal.confirm({
    title: 'Confirm Intent to Create Account',
    width: '50%',
    content: (
      <div className={config.styles.modalContent}>
        <p
          className={`${config.styles.modalParagraph} ${config.styles.highlight}`}
        >
          By clicking &quot;OK&quot; you confirm that you are creating this
          account for a real ministry and not for personal use. You also confirm
          that you have the authority to create this account on behalf of this
          ministry.
        </p>
        <p className={config.styles.modalParagraph}>
          Please note that you will not be able to use this account until you
          have completed the verification steps.
        </p>
        <p className={config.styles.modalParagraph}>
          Once you sign-in you will be prompted to complete the onboarding
          process, including selecting the features you would like to use and
          entering your payment information.
        </p>
        <p className={config.styles.modalParagraph}>
          You will not be charged until the end of your free 14-day trial.
        </p>
        <p
          className={`${config.styles.modalParagraph} ${config.styles.warning}`}
        >
          Failure to complete the verification steps may result in your account
          being suspended or deleted.
        </p>
        <p className={config.styles.contactInfo}>
          If you have any questions, please contact support at:
          support@shepherdcms.com
        </p>
      </div>
    ),
    onOk: () => {
      if (config.recapchaIsVerified) {
        config.setRegisterMerchantLoading(true);
        config.setSignUpPaymentFormValues({
          billingDetails: {
            ...config.currentForm.getFieldsValue(),
            paymentMethod: config.paymentMethod,
          },
        });
        config.setSignUpUserFormValues({
          ...config.signUpUserFormValues,
          ministryInfo: {
            ...config.signUpUserFormValues.ministryInfo,
            ...config.currentForm.getFieldsValue(),
          },
        });
        config.signUpPaid(undefined, {
          onSuccess: () => {
            config.setRegisterMerchantLoading(false);
            config.advanceToNextSignUpStep();
          },
          onError: (data: any) => {
            config.setRegisterMerchantLoading(false);
            config.addError({
              message: `There was an error creating your account. Please try again. ${data?.response?.data?.message}`,
              type: 'error',
            });
          },
        });
      } else {
        config.addError({
          message: "We couldn't verify that you are a human. Please try again.",
          type: 'error',
        });
      }
    },
  });
};

/**
 * Creates the ministry banner step configuration
 */
export const createMinistryBannerStep = (
  config: StepBuilderConfig
): SignUpStep => ({
  id: 2,
  title: 'Ministry banner',
  component: <BusinessLogoUpload />,
  nextButtonText: 'Next',
  headerText: 'Ministry Banner',
  isHiddenOnSteps: true,
  subHeaderText:
    'Upload a banner for your ministry. This will be displayed to your congregation when checking in.',
  icon: <CgProfile />,
  nextButtonDisabled: false,
  hideBackButton: false,
  nextButtonAction: () => handleMinistryBannerSubmit(config),
});
