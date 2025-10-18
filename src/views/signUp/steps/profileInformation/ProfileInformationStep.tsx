import React from 'react';
import { BsBox } from 'react-icons/bs';
import { SignUpStep } from '@/types/signUpSteps';
import { StepBuilderConfig } from '../../SignUpStepBuilder';
import ProfileInformationForm from './ProfileInformationForm.component';

/**
 * Creates the ministry information step configuration
 */
export const createMinistryInformationStep = (
  config: StepBuilderConfig
): SignUpStep => ({
  id: 1,
  title: 'Ministry Info',
  component: <ProfileInformationForm />,
  nextButtonText: 'Next',
  headerText: 'Ministry Information',
  subHeaderText:
    "This is the main ministry, you'll be able to create sub-ministries later on.",
  icon: <BsBox />,
  nextButtonDisabled: false,
  hideBackButton: false,
  nextButtonAction: async () => {
    if (await config.validateForm(config.currentForm)) {
      config.setSignUpUserFormValues({
        ...config.signUpUserFormValues,
        ministryInfo: config.currentForm.getFieldsValue(),
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
