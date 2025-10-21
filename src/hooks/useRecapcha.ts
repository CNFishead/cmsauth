import { useEffect } from 'react';
import axios from '../utils/axios';
import { useInterfaceStore } from '@/state/interface';

export const useRecapcha = () => {
  const { setRecapchaIsVerified } = useInterfaceStore();

  const handleLoaded = (_: any) => {
    (window as any).grecaptcha.ready((_: any) => {
      (window as any).grecaptcha
        .execute('6Lfk93oqAAAAAN_X64WuPI2wrI-YbNoTxULAw29f', {
          action: 'login',
        })
        .then(async (token: any) => {
          console.log('token');
          const { data } = await axios.post('/auth/recaptcha', {
            token,
          });

          console.log('Your score', data.score);
          if (data.isVerified) {
            setRecapchaIsVerified(true);
          }
        });
    });
  };

  useEffect(() => {
    // Add reCaptcha
    const script = document.createElement('script');
    script.src =
      'https://www.google.com/recaptcha/api.js?render=6Lfk93oqAAAAAN_X64WuPI2wrI-YbNoTxULAw29f';
    script.addEventListener('load', handleLoaded);
    document.body.appendChild(script);
  }, []);
};
