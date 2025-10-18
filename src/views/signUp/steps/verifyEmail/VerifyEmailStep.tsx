import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { SignUpStep } from '@/types/signUpSteps';
import { StepBuilderConfig } from '../../SignUpStepBuilder';
import VerifyEmail from './VerifyEmail.component';

/**
 * Creates the email verification step configuration
 */
export const createEmailVerificationStep = (
  config: StepBuilderConfig
): SignUpStep => ({
  id: 4,
  title: 'Verification',
  isHiddenOnSteps: false,
  component: <VerifyEmail />,
  headerText: 'Verification Email Sent',
  subHeaderText:
    'Please check your email to verify your account to start your free 14-day trial.',
  icon: <AiOutlineCheckCircle />,
  hideBackButton: true,
  hideNextButton: true,
});

/**
 * Creates the invite-specific email verification step configuration
 */
export const createInviteEmailVerificationStep = (
  config: StepBuilderConfig
): SignUpStep => ({
  id: 1,
  title: 'Verification',
  isHiddenOnSteps: false,
  component: <VerifyEmail />,
  headerText: 'Verification Email Sent',
  subHeaderText:
    'Please check your email to verify your account and complete the setup.',
  icon: <AiOutlineCheckCircle />,
  hideBackButton: true,
  hideNextButton: true,
});
