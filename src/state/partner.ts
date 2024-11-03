//create a zustand store for a token of a user
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type PartnerState = {
  partner: string | undefined;
  setPartner: (partner: string) => void;
  // setup a partner object that way we can use the partners data in rebranding
  branding: {
    logo: string;
    name: string;
    primaryColor: string;
    secondaryColor: string;
  };
  setBranding: (branding: {
    logo: string;
    name: string;
    primaryColor: string;
    secondaryColor: string;
  }) => void;
};

export const usePartnerStore = create(
  persist<PartnerState>(
    (set: any, get: any) => ({
      partner: undefined,
      setPartner: (partner) => {
        set({ partner });
      },
      branding: {
        logo: '',
        name: '',
        primaryColor: '',
        secondaryColor: '',
      },
      setBranding: (branding) => {
        set({ branding });
      },
    }),
    {
      name: 'partner-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
