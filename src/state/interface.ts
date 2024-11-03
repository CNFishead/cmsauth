//create a zustand store for a token of a user
import { create } from "zustand";
import { SignUpStep } from "../types/signUpSteps";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { v4 as uuidv4 } from "uuid";

type InterfaceState = {
  currentSignUpStep: number;
  isGoingToPreviousStep: boolean;
  currentForm: any;
  signUpUserFormValues: any;
  signUpProfileFormValues: any;
  paymentMethod: any;
  signUpPaymentFormValues: any;
  signUpErrorDetected: boolean;
  features: any[];
  redirectUrl: string | undefined;
  redirectName: string | undefined;
  didSendEmail: boolean;
  recapchaIsVerified: boolean;
  errors: { type: string; message: string; id?: string }[];

  setErrors: (errors: any[]) => void;
  addError: (error: { type: string; message: string; id?: string }, timeout?: number) => void;
  removeError: (id: string) => void;
  setCurrentSignUpStep: (step: number) => void;
  advanceToNextSignUpStep: () => void;
  goBackToPreviousSignUpStep: () => void;
  setCurrentForm: (form: any) => void;
  setSignUpUserFormValues: (values: any) => void;
  setSignUpProfileFormValues: (values: any) => void;
  setPaymentMethod: (method: string) => void;
  setSignUpPaymentFormValues: (values: any) => void;
  setSignUpErrorDetected: (value: boolean) => void;
  selectFeature: (feature: any) => void;
  removeFeature: (feature: any) => void;
  setRedirectName: (path: string | undefined) => void;
  setRedirectUrl: (url: string | undefined) => void;
  setDidSendEmail: (value: boolean) => void;
  setRecapchaIsVerified: (value: boolean) => void;
};

export const useInterfaceStore = create<InterfaceState>((set: any, get: any) => ({
  errors: [],
  setErrors: (errors: any[]) => set({ errors }),

  addError: (error: any, timeout = 5000) => {
    const { errors } = get();
    const id = uuidv4();
    set({ errors: [...errors, { id, ...error }] });

    setTimeout(() => {
      const { errors } = get();
      set({ errors: errors.filter((e: any) => e.id !== id) });
    }, timeout);
  },

  removeError: (id: string) => {
    set((state: any) => ({
      errors: state.errors.filter((error: any) => error.id !== id),
    }));
  },

  currentSignUpStep: 1,
  setCurrentSignUpStep: (step: number) => {
    set({ currentSignUpStep: step });
  },
  isGoingToPreviousStep: false,

  advanceToNextSignUpStep: () => {
    set((state: any) => {
      return {
        signUpErrorDetected: true,
        currentSignUpStep: state.currentSignUpStep + 1,
        isGoingToPreviousStep: false,
      };
    });
  },
  goBackToPreviousSignUpStep: () => {
    set((state: any) => {
      return {
        signUpErrorDetected: false,

        currentSignUpStep: state.currentSignUpStep - 1,
        isGoingToPreviousStep: true,
      };
    });
  },

  setCurrentForm: (form: any) => {
    set({ currentForm: form });
  },
  currentForm: undefined,

  signUpUserFormValues: {},
  setSignUpUserFormValues: (values: any) => {
    set({ signUpUserFormValues: values });
  },

  signUpProfileFormValues: {},
  setSignUpProfileFormValues: (values: any) => {
    set({ signUpProfileFormValues: values });
  },

  signUpErrorDetected: true,
  setSignUpErrorDetected: (value: any) => {
    set({ signUpErrorDetected: value });
  },

  paymentMethod: "",
  setPaymentMethod: (method: any) => {
    set({ paymentMethod: method });
  },

  signUpPaymentFormValues: {},
  setSignUpPaymentFormValues: (values: any) => {
    set({ signUpPaymentFormValues: values });
  },

  features: [],
  selectFeature: (feature: any) => {
    const newFeatures = get().features.filter((f: any) => f._id !== feature._id);
    newFeatures.push(feature);
    set({ features: newFeatures });
  },
  removeFeature: (feature: any) => {
    const newFeatures = get().features.filter((f: any) => f._id !== feature._id && f.reliesOn !== feature._id);
    set({ features: newFeatures });
  },

  redirectName: undefined,
  redirectUrl: undefined,
  setRedirectUrl: (url: any) => {
    set({ redirectUrl: url });
  },
  setRedirectName: (name: any) => {
    set({ redirectName: name });
  },

  didSendEmail: false,
  setDidSendEmail: (value: boolean) => {
    set({ didSendEmail: value });
  },

  recapchaIsVerified: false,
  setRecapchaIsVerified: (value: boolean) => {
    set({ recapchaIsVerified: value });
  },
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useInterfaceStore);
}
