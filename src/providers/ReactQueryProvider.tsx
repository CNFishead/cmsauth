'use client';
import React, { useEffect, useState } from 'react';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, message } from 'antd';
import { default as themeOverride } from '@/styles/theme.json';
import { Router } from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import { useInterfaceStore } from '@/state/interface';
import { v4 as uuidv4 } from 'uuid';

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const { addError } = useInterfaceStore((state) => state);
  const [client] = useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          // console.log(error);
          addError(
            { type: 'error', message: error.message, id: uuidv4() },
            5000
          );
        },
      }),
    })
  );
  //Route Events.
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());

  React.useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      minimum: 0.3,
      speed: 500,
      easing: 'ease',
      trickle: true,
      trickleSpeed: 800,
    });
  }, []);

  return (
    <QueryClientProvider client={client}>
      <ConfigProvider theme={{ ...themeOverride }}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
