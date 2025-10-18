import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { Modal } from 'antd';
import { SignUpStep } from '@/types/signUpSteps';
import { StepBuilderConfig } from '../../SignUpStepBuilder';
import UserInformationForm from './UserInformationForm.component';

/**
 * Handle invite user account creation with confirmation modal
 */
const handleInviteUserAccountCreation = (config: StepBuilderConfig): void => {
  Modal.confirm({
    title: 'Confirm Account Creation',
    width: '50%',
    content: (
      <div className={config.styles.modalContent}>
        <p
          className={`${config.styles.modalParagraph} ${config.styles.highlight}`}
        >
          By clicking &quot;OK&quot; you confirm that you want to create your
          account and join this ministry as an invited user.
        </p>
        <p className={config.styles.modalParagraph}>
          You are being invited to help manage this ministry. Once your account
          is created, you will have access to the features and permissions
          assigned to you by the ministry administrator.
        </p>
        <p className={config.styles.modalParagraph}>
          Please note that you will not be able to use this account until you
          have completed the email verification process.
        </p>
        <p className={config.styles.modalParagraph}>
          Your access level and permissions are determined by the ministry
          administrator who invited you. If you have questions about your role
          or permissions, please contact them directly.
        </p>
        <p
          className={`${config.styles.modalParagraph} ${config.styles.warning}`}
        >
          Failure to complete the verification steps may result in your
          invitation being revoked, or your account being suspended/removed.
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
 * Creates the user information step configuration
 */
export const createUserInformationStep = (
  config: StepBuilderConfig
): SignUpStep => ({
  id: 0,
  title: 'User Info',
  component: <UserInformationForm />,
  nextButtonText: 'Next',
  headerText: "We're excited to have you!",
  subHeaderText:
    'Please fill out the form below to get started. This information is all about you, the account user!',
  nextButtonDisabled: false,
  hideBackButton: true,
  icon: <AiOutlineUser />,
  nextButtonAction: async () => {
    if (await config.validateForm(config.currentForm)) {
      config.setSignUpUserFormValues({
        ...config.signUpUserFormValues,
        userInfo: config.currentForm.getFieldsValue(),
      });
      config.advanceToNextSignUpStep();
    } else {
      config.addError({
        message: 'Please complete the form before continuing',
        type: 'error',
      });
    }
  },
});

/**
 * Creates the invite-specific user information step configuration
 */
export const createInviteUserInformationStep = (
  config: StepBuilderConfig
): SignUpStep => ({
  id: 0,
  title: 'User Info',
  component: <UserInformationForm />,
  nextButtonText: 'Create Account',
  headerText: "Welcome! You've been invited to join!",
  subHeaderText:
    'Please fill out your user information to complete your account setup.',
  nextButtonDisabled: false,
  hideBackButton: true,
  icon: <AiOutlineUser />,
  nextButtonAction: async () => {
    if (await config.validateForm(config.currentForm)) {
      config.setSignUpUserFormValues({
        ...config.signUpUserFormValues,
        userInfo: config.currentForm.getFieldsValue(),
      });
      // Show confirmation modal before account creation
      handleInviteUserAccountCreation(config);
    } else {
      config.addError({
        message: 'Please complete the form before continuing',
        type: 'error',
      });
    }
  },
});
