import React from 'react';
import { SignUpStep } from '@/types/signUpSteps';
import {
  createUserInformationStep,
  createInviteUserInformationStep,
} from './steps/userInformation/UserInformationStep';
import { createMinistryInformationStep } from './steps/profileInformation/ProfileInformationStep';
import { createMinistryBannerStep } from './steps/businessLogoUpload/BusinessLogoUploadStep';
import { createVerifyStepsStep } from './steps/verifySteps/VerifyStepsStep';
import {
  createEmailVerificationStep,
  createInviteEmailVerificationStep,
} from './steps/verifyEmail/VerifyEmailStep';

/**
 * Represents a single step in the signup flow with navigation capabilities
 */
export class SignUpStepNode {
  public id: string;
  public step: SignUpStep;
  public nextStepId?: string;
  public previousStepId?: string;

  constructor(id: string, step: SignUpStep) {
    this.id = id;
    this.step = step;
  }

  /**
   * Set the next step in the flow
   */
  setNext(stepId: string): SignUpStepNode {
    this.nextStepId = stepId;
    return this;
  }

  /**
   * Set the previous step in the flow
   */
  setPrevious(stepId: string): SignUpStepNode {
    this.previousStepId = stepId;
    return this;
  }
}

/**
 * Configuration interface for step builder dependencies
 */
export interface StepBuilderConfig {
  validateForm: (form: any) => Promise<boolean>;
  addError: (error: { message: string; type: string }) => void;
  setSignUpUserFormValues: (values: any) => void;
  setSignUpPaymentFormValues: (values: any) => void;
  signUpUserFormValues: any;
  currentForm: any;
  recapchaIsVerified: boolean;
  setRegisterMerchantLoading: (loading: boolean) => void;
  signUpPaid: (data: any, callbacks: any) => void;
  paymentMethod: any;
  advanceToNextSignUpStep: () => void;
  styles: any;
}

/**
 * Manages the signup flow steps with conditional navigation
 */
export class SignUpStepBuilder {
  private steps: Map<string, SignUpStepNode> = new Map();
  private config: StepBuilderConfig;
  private currentStepId: string = 'userInfo';

  constructor(config: StepBuilderConfig) {
    this.config = config;
    this.initializeSteps();
  }

  /**
   * Initialize all available steps
   */
  private initializeSteps(): void {
    // Create step configurations using the imported factory functions
    const userInfoStep = new SignUpStepNode(
      'userInfo',
      createUserInformationStep(this.config)
    );
    const ministryInfoStep = new SignUpStepNode(
      'ministryInfo',
      createMinistryInformationStep(this.config)
    );
    const ministryBannerStep = new SignUpStepNode(
      'ministryBanner',
      createMinistryBannerStep(this.config)
    );
    const verifyStepsStep = new SignUpStepNode(
      'verifySteps',
      createVerifyStepsStep(this.config)
    );
    const emailVerificationStep = new SignUpStepNode(
      'emailVerification',
      createEmailVerificationStep(this.config)
    );
    const inviteUserInfoStep = new SignUpStepNode(
      'inviteUserInfo',
      createInviteUserInformationStep(this.config)
    );
    const inviteEmailVerificationStep = new SignUpStepNode(
      'inviteEmailVerification',
      createInviteEmailVerificationStep(this.config)
    );

    // Add all steps to the map
    this.steps.set('userInfo', userInfoStep);
    this.steps.set('ministryInfo', ministryInfoStep);
    this.steps.set('ministryBanner', ministryBannerStep);
    this.steps.set('verifySteps', verifyStepsStep);
    this.steps.set('emailVerification', emailVerificationStep);
    this.steps.set('inviteUserInfo', inviteUserInfoStep);
    this.steps.set('inviteEmailVerification', inviteEmailVerificationStep);
  }

  /**
   * Build the step flow for regular ministry signup
   */
  buildRegularFlow(): { [key: number]: SignUpStep } {
    // Set up the flow: userInfo -> ministryInfo -> ministryBanner -> verifySteps -> emailVerification
    this.steps.get('userInfo')?.setNext('ministryInfo');
    this.steps
      .get('ministryInfo')
      ?.setNext('ministryBanner')
      .setPrevious('userInfo');
    this.steps
      .get('ministryBanner')
      ?.setNext('verifySteps')
      .setPrevious('ministryInfo');
    this.steps
      .get('verifySteps')
      ?.setNext('emailVerification')
      .setPrevious('ministryBanner');
    this.steps.get('emailVerification')?.setPrevious('verifySteps');

    return {
      0: this.steps.get('userInfo')!.step,
      1: this.steps.get('ministryInfo')!.step,
      2: this.steps.get('ministryBanner')!.step,
      3: this.steps.get('verifySteps')!.step,
      4: this.steps.get('emailVerification')!.step,
    };
  }

  /**
   * Build the step flow for invite signup (skip ministry steps)
   */
  buildInviteFlow(): { [key: number]: SignUpStep } {
    // Set up the flow: inviteUserInfo -> inviteEmailVerification
    this.steps.get('inviteUserInfo')?.setNext('inviteEmailVerification');
    this.steps.get('inviteEmailVerification')?.setPrevious('inviteUserInfo');

    return {
      0: this.steps.get('inviteUserInfo')!.step,
      1: this.steps.get('inviteEmailVerification')!.step,
    };
  }

  /**
   * Get the step configuration based on signup type
   */
  getStepsConfig(isInviteSignup: boolean): { [key: number]: SignUpStep } {
    return isInviteSignup ? this.buildInviteFlow() : this.buildRegularFlow();
  }
}
