import { Router } from 'next/router';
import NProgress from 'nprogress';
import { useEffect } from 'react';

export const useNProgress = () => {
  Router.events.on('routeChangeStart', () => {
    console.log('ROUTER CHANGE START');

    return NProgress.start();
  });
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      minimum: 0.3,
      speed: 500,
      easing: 'ease',
      trickle: true,
      trickleSpeed: 800,
    });
  }, []);
};
