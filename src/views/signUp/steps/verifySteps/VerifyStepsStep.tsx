import React from 'react';
import { SignUpStep } from '@/types/signUpSteps';
import { StepBuilderConfig } from '../../SignUpStepBuilder';
import VerifySteps from './VerifySteps.component';

/**
 * Creates the verify steps configuration
 */
export const createVerifyStepsStep = (
  config: StepBuilderConfig
): SignUpStep => ({
  id: 3,
  isHiddenOnSteps: true,
  component: <VerifySteps />,
  nextButtonText: 'Send Verification Email',
  headerText: 'Next Steps',
  subHeaderText:
    'There are a few verifications steps needed before you can start using your account.',
  nextButtonDisabled: false,
  hideBackButton: false,
  nextButtonAction: () => {
    config.advanceToNextSignUpStep();
  },
});
